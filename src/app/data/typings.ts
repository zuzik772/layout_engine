export type ModuleSpec = {
  module_spec_id: string;
  name: string;
  id: string;
  disabled: boolean;
};

export type ModuleGroup = {
  id: number;
  name: ModuleGroupNames;
};

export type ModuleGroupSpecModuleSpecIds = {
  id: number;
  module_spec_id: string;
};

export type ModuleGroupNames =
  | "Sportsbook Home"
  | "Sportsbook Home Sport"
  | "Sportsbook Home Region"
  | "Sportsbook Home League"
  | "Sportsbook Daily"
  | "Sportsbook Live Home"
  | "Sportsbook Live Sports"
  | "Sportsbook Live Region"
  | "Sportsbook Live League"
  | "Sportsbook Search"
  | "Sportsbook Outright League"
  | "Sportsbook Tournament Fixtures"
  | "Sportsbook Streaming - Live and Upcoming"
  | "Sportsbook Streams"
  | "Casino - All"
  | "Casino - New"
  | "Casino - Jackpot"
  | "Casino - Slots"
  | "Sportsbook Pre-pack Specials"
  | "Sportsbook Pre-pack Specials Sport"
  | "Sportsbook Pre-pack Specials Region"
  | "Sportsbook Pre-pack Specials League";

export type SpecPosition = {
  module_group_specs_id: number;
  module_groups_id: number;
  current_position: number;
};

export type MobileLayoutConfig = {
  spec_id: number;
  title?: string;
  type?: string;
  columns?: number;
  rows?: number;
  boxed?: boolean;
};

export interface DesktopLayoutConfig extends MobileLayoutConfig {
  layout_option?: string;
}
