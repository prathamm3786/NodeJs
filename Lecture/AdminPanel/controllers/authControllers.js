const user = require('../models/userSchema');
var nodemailer = require('nodemailer');
const loginPage = (req, res) => {
    return res.render('login');
}
const registerPage = (req, res) => {
    return res.render('register');
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await user.create({
            name: name,
            email: email,
            password: password
        });
        console.log('User created successfully');
        return res.redirect('/');

    } catch (error) {
        console.log(error);
        return false

    }
}
const loginUser = async (req, res) => {
    try {
        return res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
        return false

    }
}
const dashboardPage = (req, res) => {
    return res.render('dashboard');
}
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false
        }


    })
    return res.redirect('/')
}
const typoPage = (req, res) => {
    return res.render('typography')
}
const cardPage = (req, res) => {
    return res.render('card')
}
const formsPage = (req, res) => {
    return res.render('forms')
}
const alertPage = (req, res) => {
    return res.render('alert')
}
const buttonPage = (req, res) => {
    return res.render('button')
}
const samplePage = (req, res) => {
    return res.render('sample')
}
const iconPage = (req, res) => {
    return res.render('icon')
}
const otpPage = async (req, res) => {
    try {
        return res.render('otp')

    } catch (error) {
        console.log(error);
        return false;
    }
}
const newpasswordPage = async (req, res) => {
    try {
        return res.render('newpassword')

    } catch (error) {
        console.log(error);
        return false;
    }
}
const forgotPassword = async (req, res) => {
    try {
        let useremail = req.body.useremail;
        let User = await user.findOne({ email: useremail });
        if (!User) {
            console.log('User not found');
            return res.redirect('/')
        }
        const otp = Math.floor(100000 + Math.random() * 900000);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'prathamm3786@gmail.com',
                pass: 'vupg irtp owin ttyq'
            }
        });

        var mailOptions = {
            from: 'prathamm3786@gmail.com',
            to: useremail,
            subject: 'forgot password',
            html: `<h2 style='color:green'>Hello ${User?.name} Your OTP is ${otp}</h2>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                let auth = {
                    email: useremail,
                    otp: otp
                }
                res.cookie('user', auth);
                return res.redirect('/otp')
            }
        });


    } catch (error) {
        console.log(error);
        return false;

    }
}
const verifyOtp = async (req, res) => {
    try {
        let otp = req.body.otp;
        let user = req.cookies.user;
        if (otp == user.otp) {
            return res.redirect('/newpassword')
        } else {
            console.log('Invalid OTP');
            return res.redirect('/otp')
        }

    } catch (error) {
        console.log(error);
        return false;

    }
}
const setNewPassword = async (req, res) => {
    try {
        let newpass = req.body.newpassword;
        let cpass = req.body.confirmpassword;
        if (newpass == cpass) {
            let email = req.cookies.user?.email;
            let User = await user.findOneAndUpdate({email:email},{
                password:newpass
            })
            res.clearCookie('user');
            return res.redirect('/')

        }
        else{
            console.log('Password not matched');
            return res.redirect('/newpassword')
        }

    } catch (error) {
        console.log(error);
        return false;

    }
}
module.exports = {
    loginPage,
    registerPage, registerUser, loginUser,
    dashboardPage, logoutUser, buttonPage, typoPage, cardPage, formsPage, alertPage, samplePage, iconPage, otpPage, newpasswordPage, forgotPassword, verifyOtp, setNewPassword
}