// const BASE_URL = "http://abhay-logistics.redbytes.in/api/transporter/";
const CLIENT_BASE_URL = "https://abayadmin.abaylogistics.com/api/transporter/";

const ApiConfig = {
  // BASE_URL,
  CLIENT_BASE_URL,
  BASE_URL_FOR_IMAGES: "https://abayadmin.abaylogistics.com/",
  /* Transporter API url Start*/
  TRANSPORTER_LOGIN_API: CLIENT_BASE_URL + "login",
  TRANSPORTER_LOGOUT_API: CLIENT_BASE_URL + "logout",
  TRANSPORTER_CONTACT_US_API: CLIENT_BASE_URL + "contactus",
  COMPANY_TYPE_DROPDOWN: CLIENT_BASE_URL + "dropdown/companytype",
  ADMIN_DROPDOWN: CLIENT_BASE_URL + "dropdown",
  ADD_TRANSPORTER: CLIENT_BASE_URL + "tpregister",
  AddVehicleDropdownlist: CLIENT_BASE_URL + "vehicle/dropdownlist",
  ADDOWNER: CLIENT_BASE_URL + "owner/add",
  EDIT_VEHICLE: CLIENT_BASE_URL + "vehicle/edit",
  EDIT_DRIVER: CLIENT_BASE_URL + "driver/edit",

  // AddVehicle: "https://app.abaylogistics.com/api/admin/vehicle/add",
  AddVehicle: CLIENT_BASE_URL + "vehicle/add",
  OWNER_LIST: CLIENT_BASE_URL + "owner/list",
  DRIVER_LIST: CLIENT_BASE_URL + "driver/list",
  ACTIVE_DRIVER_LIST: CLIENT_BASE_URL + "driver/listforvehicleoffer",
  VEHICLE_LIST: CLIENT_BASE_URL + "vehicle/list",
  DRIVER_DETAILS: CLIENT_BASE_URL + "driver/details",
  TRANSPORTER_LIST: CLIENT_BASE_URL + "list",

  VEHICLE_DETAILS: "https://abayadmin.abaylogistics.com/api/admin/vehicle/details",
  CHANGE_DRIVER_VEHICLE: CLIENT_BASE_URL + "driver/changedriver_vehicle",
  ADD_DRIVER: "https://abayadmin.abaylogistics.com/api/admin/driver/add",
  ONLINE_AUCTION_OFFER_GOODS: CLIENT_BASE_URL + "vehiclerequest/onlineorders",
  ONGOING_FRIGHT: CLIENT_BASE_URL + "freights/ongoing",
  UPCOMMING_FRIGHT: CLIENT_BASE_URL + "freights/upcoming",
  COMPLETED_FRIGHT: CLIENT_BASE_URL + "freights/completed",
  COMPLETE_FRIGHT: CLIENT_BASE_URL + "freights/complete",
  DRIRECT_ORDER_OFFER_GOODS: CLIENT_BASE_URL + "vehiclerequest/directorders",
  GOODS_DETAILS: CLIENT_BASE_URL + "load/details",
  DIRECT_ORDERS_OFFERED_VEHICLES:
    CLIENT_BASE_URL + "vehicleoffer/historydirect",
  DIRECT_ORDERS_OFFERED_VEHICLES_ONLINE:
    CLIENT_BASE_URL + "vehicleoffer/historyonline",
  DIRECT_ORDERS_ORDER_CONFIRMATION_: CLIENT_BASE_URL + "orderconfirmation",
  DIRECT_ORDERS_ORDER_CONFIRMATION_Online_:
    CLIENT_BASE_URL + "orderconfirmation/online",
  VIEWSPECIFICATION: CLIENT_BASE_URL + "vehiclerequest/viewspecification",
  BLOCK_VEHICLE: CLIENT_BASE_URL + "vehicle/block",
  DELETE_VEHICLE: CLIENT_BASE_URL + "vehicle/delete",
  DELETE_DRIVER: CLIENT_BASE_URL + "driver/delete",
  UNBLOCK_VEHICLE: "https://abayadmin.abaylogistics.com/api/admin/vehicle/unblock",
  BLOCK_DRIVER: CLIENT_BASE_URL + "driver/block",
  UNBLOCK_DRIVER: "https://abayadmin.abaylogistics.com/api/admin/driver/unblock",
  DIRECT_ORDER_OFFER_GOODS_VEHICLE_REJECT:
    CLIENT_BASE_URL + "vehiclerequest/reject",
  DRIRECT_ORDER_OFFER_GOODS_VEHICLE_ACCEPT:
    CLIENT_BASE_URL + "vehiclerequest/acceptweb",
  DRIRECT_ORDER_OFFER_VEHICLES_VEHICLE_DETAILS:
    CLIENT_BASE_URL + "vehicleoffer/vehicledetails",
  ONLINE_AUCTION_OFFERGOODS_MAKE_BID: CLIENT_BASE_URL + "bid/add",
  PROFILE: CLIENT_BASE_URL + "profile",
  DASHBOARD: CLIENT_BASE_URL + "dashboard",
  NOTIFICATION: CLIENT_BASE_URL + "notification",
  DELETE_NOTIFICATION: CLIENT_BASE_URL + "notification/bulk_delete",
  VEHICLE_LIST_BY_LOADID: CLIENT_BASE_URL + "vehicleoffer/vehicledetails",
  ORDER_CONFIRMATION_ORDER_DETAILS:
    CLIENT_BASE_URL + "orderconfirmation/vehicledetails",
  VIEW_ORDER_OFFERED_VEHICLES_DETAILS:
    CLIENT_BASE_URL + "orderconfirmation/vehicledetails",
  LIVE_TRACKING: CLIENT_BASE_URL + "livetrack",
  INITIATE_FRIGHT: CLIENT_BASE_URL + "freights/initiate",
  FORGET_PASSWORD: CLIENT_BASE_URL + "forgotpassword",
  RESET_PASSWORD: CLIENT_BASE_URL + "resetpassword",
  TARRIF_EXPORT_LIST: CLIENT_BASE_URL + "tariffexport",
  TARRIF_IMPORT_LIST: CLIENT_BASE_URL + "tariffimport",
  REPORT_TYPES: CLIENT_BASE_URL + "report/types",
  REPORT_ADD: CLIENT_BASE_URL + "report/add",
  VEHICLE_DROPDOWNLIST:
    "https://abayadmin.abaylogistics.com/api/admin/vehicle/dropdownlist",
  ADDVEHICLEOFFER: CLIENT_BASE_URL + "vehiclerequest/addvehicleoffer",
  ADD_ONLINE_VEHICLEOFFER: CLIENT_BASE_URL + "bid/addvehicleoffer",
  LISTVEHICLEOFFER: CLIENT_BASE_URL + "vehiclerequest/vehiclelist",
  ONLINE_LISTVEHICLEOFFER: CLIENT_BASE_URL + "bid/vehiclelist",
  SENDVEHICLEOFFER: CLIENT_BASE_URL + "vehiclerequest/sendoffer",
  ONLINE_SENDVEHICLEOFFER: CLIENT_BASE_URL + "bid/sendoffer",
  MAKEBID: CLIENT_BASE_URL + "bid/mobileadd",
  BIDLIST: CLIENT_BASE_URL + "bid/list",
  TRANSPORTER_DETAILS:
    "https://abayadmin.abaylogistics.com/api/admin/transporter/details",
  EDIT_TRANSPORTER: CLIENT_BASE_URL + "tpregister/edit",
  REGISTER_ADD_VEHICLE: CLIENT_BASE_URL + "tpregister/vehicleadd",
  REGISTER_ADD_DRIVER: CLIENT_BASE_URL + "tpregister/driveradd",
  SUBMIT: CLIENT_BASE_URL + "tpregister/submit",
  REGISTERED_VEHICLE_LIST: CLIENT_BASE_URL + "tpregister/vehiclelist",
  REGISTERED_DRIVER_LIST: CLIENT_BASE_URL + "tpregister/driverlist",
  // TRUCK_LIST : CLIENT_BASE_URL + "vehicle/trucklist",
  TRAILER_LIST: CLIENT_BASE_URL + "vehicle/trailerlist",
  TRUCK_LIST: CLIENT_BASE_URL + "dropdown/vehicletypes",
  POWER_PLATE_NO: CLIENT_BASE_URL + "dropdown/powerplatenumbers",
  DELETE_VEHICLE_OFFER: CLIENT_BASE_URL + "vehiclerequest/deletevehicle",
  DELETE_BID_VEHICLE_OFFER: CLIENT_BASE_URL + "bid/deletevehicle",
  CHANGE_PASSWORD: CLIENT_BASE_URL + "changepassword",
  /* Transporter API url End*/
};
export default ApiConfig;
