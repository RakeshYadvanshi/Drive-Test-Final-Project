
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const authenticationController = require('./controllers/authentication-controller');
const gTestController = require('./controllers/g-test-controller');
const g2TestController = require('./controllers/g2-test-controller');
const appointmentController = require('./controllers/appointment-controller');
const examinerController = require('./controllers/examiner-controller');
const { ValidateUserInformation } = require('./middlewares/g2-test-validation');
const sessionSetup = require('./middlewares/session-setup');
const expressSesssion = require('express-session')

const app = express();
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const dashboardController = require('./controllers/dashboard-controller');
const settings = require('./settings');
const {
    DriverUserTypeValidation,
    UserLoginValidation,
    AdministratorUserTypeValidation,
    ExaminerUserTypeValidation
} = require('./middlewares/authentication')

global.IsUserLoggedIn = null;
global.LoginedUserType = null;
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(expressSesssion({ secret: settings.SessionSecret, cookie: { maxAge: 1000 * 60 * 60 } }));
app.use("*", sessionSetup);

app.post('/apply-for-g2-test', ValidateUserInformation);

mongoose.connect("mongodb+srv://rakesh6950:22wLhQ44PRGgH5e@cluster0.ewrta.mongodb.net/fullstackdevelopment", { useNewUrlParser: true });

app.get('/login', authenticationController.Get.Login);
app.post('/login', authenticationController.Post.Login);
app.get('/register', authenticationController.Get.Register);
app.post('/register', authenticationController.Post.Register);
app.get('/logout', authenticationController.Get.Logout);


app.get('/g-test', DriverUserTypeValidation, gTestController.Get.GTest)
app.get('/dashboard', UserLoginValidation, dashboardController.Get.Dashboard)
app.get('/g2-test/:saved?', DriverUserTypeValidation, g2TestController.Get.GTestResponse)
app.get('/exam-feedback/:ExamineeId/:AppointmentId', DriverUserTypeValidation, g2TestController.Get.ExamFeedback);
app.get('/', authenticationController.Get.Login)


app.post('/apply-for-g2-test', DriverUserTypeValidation, g2TestController.Post.ApplyForG2)
app.post('/api/update-user-detail', UserLoginValidation, gTestController.Post.UpdateGUserInformation)

app.get('/admin-appointments', AdministratorUserTypeValidation, appointmentController.Get.AdminAppointment);
app.get('/admin-driver-list', AdministratorUserTypeValidation, appointmentController.Get.AdminDriverListView);


app.post('/api/admin/add-availablity', AdministratorUserTypeValidation, appointmentController.Post.AddAppointment);
app.post('/api/admin/get-availabilty-by-date', AdministratorUserTypeValidation, appointmentController.Post.GetAdminAppointmentByDate);
app.post('/api/admin/delete-availablity', AdministratorUserTypeValidation, appointmentController.Post.DeleteAppointment);
app.post('/api/get-availabile-slots-by-date', DriverUserTypeValidation, appointmentController.Post.GetAvailableAppointmentByDate);

app.post('/api/admin-driver-list', AdministratorUserTypeValidation, appointmentController.Post.AdminDriverList);

app.get('/Examiner', ExaminerUserTypeValidation, examinerController.Get.ExaminerView);
app.get('/TakeExam/:ExamineeId/:AppointmentId', ExaminerUserTypeValidation, examinerController.Get.TakeExam)

app.post('/api/get-today-pending-appointment', ExaminerUserTypeValidation, examinerController.Post.GetPendingAppointment);
app.post("/api/save-test-observations", ExaminerUserTypeValidation, examinerController.Post.SaveTestObservations);
app.post("/api/update-appointment-no-show", ExaminerUserTypeValidation, examinerController.Post.UpdateAppointmentNoShow);


app.use(express.static('public'))
app.get('*', (req, res) => {
    res.render("404");
});
app.listen(8004, () => {
    console.log("App listening on port 8004")
})


