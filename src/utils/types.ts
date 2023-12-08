export enum EPresetTimes {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = DAY * 7,
  TEN_DAYS = DAY * 10,
}

export interface BasePaginatedRes {
  total: number;
  page: number;
  size: number;
  pages: number;
}

export enum OrderType {
  pickup = 1,
  delivery = 2,
}

export interface BranchType {
  id: string;
  name: string;
  longtitude: number | null;
  latitude: number | null;
  country: string;
  status: number;
  // origin: number;
  fillial_department: {
    id: string;
    name: string;
    origin: number;
    parentfillial: {
      name: string;
    };
  }[];
  is_fabrica: number;
}
export interface BranchTypes extends BasePaginatedRes {
  items: BranchType[];
}

export enum MainPermissions {
  reports = 1,

  orders = 2,
  add_order = 3,
  edit_orders = 4,

  archieve = 5,

  roles = 9,
  edit_roles = 11,
  add_role = 10,

  payers = 12,
  edit_payers = 14,
  add_payers = 13,

  spheres = 15,
  add_sphere = 16,
  edit_sphere = 17,

  fillings = 1,
  filling = 2,
  add_categories = 2,

  settings = 18,

  users = 6,
  add_user = 7,
  edit_user = 8,

  sphere_users = 1,
  add_sphere_users = 1,
  edit_sphere_users = 1,
}
export interface MeTypes {
  user: UserType;
  permissions: {
    [key: number]: number;
  };
}

export interface SphereTypes {
  name: string;
  status: number;
  id: number;
  sphereuser: [
    {
      id: number;
      sphere_id: number;
      name: string;
      status: number;
      sequence: number;
      user_id: number;
      sp_user: UserType;
    }
  ];
}

export interface SphereUsers {
  id: number;
  sphere_id: number;
  status: number;
  sequence: number;
  user_id: number;
  sp_user: UserType;
  name: string;
}

export interface ContentTypes {
  name: string;
  id: number;
  status: number;
}

export enum ContentType {
  string = 1,
  image = 2,
  number = 3,
  select = 4,
}
export interface SubCategoryTypes {
  id: number;
  name: string;
  category_id: number;
  contenttype_id: number;
  subcategory_vs_category: {
    name: string;
    price: number;
    id: number;
    status: number;
  };
  subcategory_vs_contenttype: {
    id: number;
    name: string;
    status: number;
  };
}

export interface SubCatSelectVals {
  id: number;
  content: string;
  value: string;
  selval_vs_subcat: {
    id: number;
    name: string;
    category_id: number;
    contenttype_id: number;
    subcategory_vs_category: {
      name: string;
      price: number;
      id: number;
      status: number;
    };
    subcategory_vs_contenttype: {
      id: number;
      name: string;
      status: number;
    };
  };
}
export interface RoleTypes {
  id: number;
  name: string;
  role_permission: [
    {
      id: number;
      pagecrud_id: number;
      permission_crud: {
        id: number;
        name: string;
      };
    }
  ];
}

export interface PayersType {
  id: number;
  name: string;
  status: number;
}
export interface PermissionTypes {
  id: number;
  name: string;
  pages_crud: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface HistoryTypes {
  id: number;
  user_id: number;
  order_id: number;
  status: number;
  comment: string;
  created_at: string | Date;
  hi_user: UserType;
}
export interface UserType {
  username: string;
  status: number;
  created_at: string;
  full_name: string;
  is_client: number;
  id: number;
  role_id: number;
  phone_number: string;
  tg_id: null | number;
  user_role: { id: number; name: string };
  show?: number;
}

export interface UsersType extends BasePaginatedRes {
  items: UserType[];
}

export interface Order {
  id: number;
  title: string;
  price: string;
  payment_type: number;
  supplier: string;
  sphere_id: number;
  payer_id: number;
  files: [string];
  status: number;
  order_sp: {
    name: string;
    status: number;
    id: number;
    sphereuser: [
      {
        id: number;
        sphere_id: number;
        name?: string;
        status: number;
        sequence: number;
        user_id: number;
        sp_user: UserType;
      }
    ];
  };
  order_py: {
    id: number;
    name: string;
    status: number;
  };
  created_at: string | Date;
  order_hi: [
    {
      id: number;
      user_id: number;
      order_id: number;
      status: number;
      comment: string;
      created_at: string | Date;
    }
  ];
  purchaser: string;
  is_urgent: number;
  comment: string;
}

export interface OrdersTypes extends BasePaginatedRes {
  items: Order[];
}
export enum OrderStatus {
  new,
  accept,
  deny,
}

export interface CurrencyTypes {
  id: number;
  Code: string;
  Ccy: string;
  CcyNm_RU: string;
  CcyNm_UZ: string;
  CcyNm_UZC: string;
  CcyNm_EN: string;
  Nominal: string;
  Rate: string;
  Diff: string;
  Date: string;
}
