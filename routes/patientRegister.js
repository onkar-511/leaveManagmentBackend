const expressRoute = require('express')
const router = expressRoute.Router();
const { savePatient, getPatient, deleteStaff, findSingalePatient, updatePatient } = require('../controller/patientRegister')
const { deletehod, findSingalehod, gethod, savehod } = require('../controller/hodregister');
const { addLeave, findSingaleLeave, deleteLeave, getLeave, updateLeave } = require('../controller/leaveManage')
const { loginAuth } = require('../controller/login');
const { allAdminData } = require('../controller/admin');
const { uploadFile } = require('../controller/fileUpload')
const joi = require('joi')
const uploadMiddleware = require('../middleware/mullter');
const sendMail = require('../middleware/mailer')
const paymentGetway = require('../middleware/razorPay')
const graphql = require('../middleware/graphquel')

router.route("/staffregister").post(savePatient, sendMail);
router.route("/staffregister").get(getPatient);
router.route("/staffregister/:id").delete(deleteStaff);
router.route("/staffregister/:id").get(findSingalePatient);
router.route("/staffregister").patch(updatePatient);

router.route("/hodregister").post(savehod);
router.route("/hodregister").get(gethod);
router.route("/hodregister/:id").delete(deletehod);
router.route("/hodregister/:id").get(findSingalehod);

router.route("/leavestatus").post(addLeave);
router.route("/leavestatus").get(getLeave);
router.route("/leavestatus/:id").delete(deleteLeave);
router.route("/leavestatus/:id").get(findSingaleLeave);
router.route("/leavestatus/:id").put(updateLeave);

router.route("/admin").get(allAdminData);
router.route("/uploadFile").post(uploadMiddleware, uploadFile);
router.route("/mailTest").get(sendMail);
router.route("/paymentGet").post(paymentGetway);
router.route("/graphql").get(graphql);


// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
// router.route("/uploadFile", upload.single('file')).post(uploadFile);
// router.route("/uploadFile", uploadMiddleware).post(uploadFile);

const validate = (req, res, next) => {
    const schema = joi.object().keys({
        username: joi.string().required(),
        password: joi.number().required(),
    }).unknown()

    const { error } = schema.validate(req.body, { abortEarly: false })
    console.log(error, '---------')
    if (error) {
        res.status(200).json({ error: error })
    } else {
        next()
    }
}

router.route("/login").post(loginAuth)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json'); // Assuming you have a separate file for Swagger/OpenAPI documentation

router.route("/api-docs").get(swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = router
