export type ModuleSpec = {
  module_spec_id: string;
  name: string;
  id: string;
  disabled: boolean;
};

export type ModuleGroup = {
  id: number;
  name: ModuleGroupNames;
  target_context_type: TargetContextType;
  // module_group_spec_module_spec_ids: number[];
  // module_spec_option_ids: string[];
  // module_layout_spec_ids: string[];
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

export type TargetContextType =
  | "all"
  | "sport"
  | "region"
  | "league"
  | "sg-play:casino-all:app:gb"
  | "sg-play:casino-new:app:gb"
  | "sg-play:casino-jackpot:app:gb"
  | "sg-play:casino-slots:app:gb";

export type SpecPosition = {
  module_group_spec_module_specs_id: number;
  module_group_spec_id: number;
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
