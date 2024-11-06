"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ModuleGroup as ModuleGroupSpec, ModuleSpec } from "../data/typings";
import axios from "axios";

type ModuleGroupProps = {
  moduleGroups: ModuleGroupSpec[];
  setModuleGroups: (moduleGroups: ModuleGroupSpec[]) => void;
  selectedModuleSpecs: ModuleSpec[];
  setSelectedModuleSpecs: (moduleGroups: ModuleSpec[]) => void;
  allModuleSpecs: ModuleSpec[];
  setAllModuleSpecs: (moduleGroups: ModuleSpec[]) => void;
};

const GlobalContext = createContext<ModuleGroupProps>({} as ModuleGroupProps);

const ModuleGroupProvider = ({ children }: PropsWithChildren) => {
  const [moduleGroups, setModuleGroups] = useState<ModuleGroupSpec[]>([]);
  const [selectedModuleSpecs, setSelectedModuleSpecs] = useState<ModuleSpec[]>(
    []
  );
  const [allModuleSpecs, setAllModuleSpecs] = useState<ModuleSpec[]>([]);

  async function getModuleGroups(): Promise<ModuleGroupSpec[]> {
    const res = await axios.get("/api/module-group-specs");
    return res.data;
  }

  //replace module_specs from .json and get them from route.ts instead of importing them

  async function getModuleSpecs(): Promise<ModuleSpec[]> {
    const res = await axios.get("/api/module-specs");
    return res.data;
  }

  async function getModuleGroupSpecs(id: number): Promise<ModuleSpec[]> {
    try {
      console.log("id", id);
      const res = await axios.get(`/api/module-group-specs/${id}`);
      console.log("res", res);
      return res.data;
    } catch (error) {
      console.error("Error fetching module group specs:", error);
      throw error;
    }
  }

  // async getAllModuleGroupSpecs(): Promise<ModuleSpec[]> {
  //     try {
  //       const res = await axios.get(`/api/module-group-specs`);
  //       return res.data;
  //     } catch (error) {
  //       console.error("Error fetching module group specs:", error);
  //       throw error;
  //     }
  //   }

  async function getAllModuleGroupSpecs(): Promise<any[]> {
    try {
      const res = await axios.get(`/api/module-group-spec-module-specs`);
      console.log("hereeeeeeeee res", res);
      return res.data;
    } catch (error) {
      console.error("Error fetching module group specs:", error);
      throw error;
    }
  }

  useEffect(() => {
    getModuleSpecs().then((data) => {
      setAllModuleSpecs(data);
    });
    getAllModuleGroupSpecs().then((data) => {
      console.log("myyyyy data", data);
    });
    // getModuleGroupSpecs(id).then((data) => {
    //   setSelectedModuleSpecs(data);
    // });
  }, []);

  useEffect(() => {
    getModuleGroups().then((data) => {
      setModuleGroups(data);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        moduleGroups,
        setModuleGroups,
        selectedModuleSpecs,
        setSelectedModuleSpecs,
        allModuleSpecs,
        setAllModuleSpecs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useModuleGroupProvider = () => useContext(GlobalContext);

export default ModuleGroupProvider;
