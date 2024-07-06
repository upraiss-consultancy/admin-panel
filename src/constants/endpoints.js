const END_POINTS = {
    LOGIN_ADMIN: '/v0/admin/login',
    REGISTER_ADMIN: '/v0/admin/register-admin',
    LOGOUT_ADMIN: "/v0/admin/log_out",
    ALL_USER_ADMIN: '/v0/admin/user-list',
    ALL_ADMIN_USER: "/v0/admin/update-admin_user",
    UPDATE_ADMIN: "/v0/admin/update-admin_user",
    USER_LOGIN: "/v0/user/login",
    USER_LOGOUT: "/v0/user/login",
    USER_OTP_VERIFY: "/v0/user/login",
    USER_COMPLETE_KYC: "/v0/user/complete_user_detail",
    USER_UPLOAD_IMAGE: "/v0/user/complete_user_detail",
    USER_PROFILE: "/v0/user/get_user_profile",
    USER_INTEREST:"/v0/user/user_interest",
    USER_BOOKING_LIST:"/v0/user/user_booking_upcoming_list",
    CREATE_BOOKING: "/v0/user/user_booking_upcoming_list",
    BOOKING_LIST: "/v0/booking/booking_list",
    ASSIGN_RIDE:"/v0/booking/assing_ride",
    USER_INTERESTED_ASSIGN_RIDE:"/v0/booking/user_interested_assing_ride",
    ADMIN_DELETE_BOOKING:"/v0/admin/delete_booking",
    ADMIN_CANCEL_BOOKING:"/v0/admin/cancel_booking/{bookingId}"
}
export default END_POINTS