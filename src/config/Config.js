const routes = {
    // base: 'http://192.168.1.210:4000/api/v1.0',
    // base: 'http://192.168.1.87:4000/api/v1.0',
    base:'http://13.127.17.91:4000/api/v1.0',    
    UserSignup:'/user/signup',
    businesstypes:'/admin/businesstypes/all',
    Fetchall:'/business/fetchall',
    searchFetch:'/business/fetch',
    Login:'/user/login',
    AddBusiness:'/business/add',
    profileUpdate:'/user/',
    ForgotPassword:'/user/forgotpassword',
    fetchShopDetails:'/business/',
    addtowishlist:'/favourites/of',
    getServicesList:'/services/getall/',
    addService:'/services/add',
    getWishlistData:'/favourites/all',
    removefromWishlist:'/favourites/',
    getServiceSlots:'/slots/all',
    getProfileDetailswithImage:'/user/profile',
    getProfileImage:'/user/profile/',
    bookSlot:'/bookings/add',
    bookedSlots:'/slots/booked',
    pendingSlots:'/bookings/pending/on',
    paymode:'/bookings/payment'

}

const appUtils = {
    passwordLength: 8,
    pincodelenghth:6
};

export default {routes, appUtils};