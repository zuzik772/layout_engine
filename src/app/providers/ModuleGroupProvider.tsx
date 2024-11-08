"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ModuleGroup as ModuleGroupSpec, ModuleSpec } from "../data/typings";
import axios from "axios";
import Loading from "../loading";
import { FlexCenterContainer } from "../components/layout/styling";

type ModuleGroupContext = {
  memoizedModuleGroups: ModuleGroupSpec[];
  allModuleSpecs: ModuleSpec[];
  setModuleSpecs: (moduleGroups: ModuleSpec[]) => void;
};

const ModuleGroupContext = createContext<ModuleGroupContext | undefined>(
  undefined
);

const ModuleGroupProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [moduleGroups, setModuleGroups] = useState<ModuleGroupSpec[]>([]);
  const [moduleSpecs, setModuleSpecs] = useState<ModuleSpec[]>([]);

  useEffect(() => {
    async function getModuleGroups() {
      try {
        const res = await axios.get("/api/module-group-specs");
        setModuleGroups(res.data);
      } catch (error) {
        console.error("Error fetching module groups:", error);
      } finally {
        setLoading(false);
      }
    }

    async function getModuleSpecs() {
      try {
        const res = await axios.get("/api/module-specs");
        setModuleSpecs(res.data);
      } catch (error) {
        console.error("Error fetching module specs:", error);
      } finally {
        setLoading(false);
      }
    }
    getModuleGroups();
    getModuleSpecs();
  }, []);

  const memoizedModuleGroups = useMemo(() => moduleGroups, [moduleGroups]);
  const allModuleSpecs = useMemo(() => moduleSpecs, [moduleSpecs]);

  if (loading) {
    return (
      <FlexCenterContainer>
        <Loading />
      </FlexCenterContainer>
    );
  }

  return (
    <ModuleGroupContext.Provider
      value={{
        memoizedModuleGroups,
        allModuleSpecs,
        setModuleSpecs,
      }}
    >
      {children}
    </ModuleGroupContext.Provider>
  );
};

// export const useModuleGroupProvider = () => useContext(ModuleGroupContext);

export const useModuleGroupProvider = () => {
  const context = useContext(ModuleGroupContext);
  if (context === undefined) {
    throw new Error("useModuleGroup must be used within a ModuleGroupProvider");
  }
  return context;
};

export default ModuleGroupProvider;
