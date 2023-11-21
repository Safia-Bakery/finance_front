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
  fillings = 1,
  filling = 2,
  add_categories = 2,
}
export interface MeTypes {
  id: number | string;
  username: string;
  role?: { descrition: string; name: string };
  full_name: string;
  permissions: number[];
}

export interface CategoryTypes {
  name: string;
  id: number;
  status: number;
  price: number;
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
export interface UserType {
  username: string;
  status: number;
  created_at: string;
  full_name: string;
  is_client: number;
  id: number;
  role_id: number;
  phone_number: string;
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
        status: number;
        sequence: number;
        user_id: number;
        sp_user: {
          username: string;
          status: number;
          created_at: string | Date;
          full_name: string;
          is_client: number;
          id: number;
          role_id: number;
          phone_number: string;
          user_role: {
            id: number;
            name: string;
          };
          tg_id: number;
        };
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
