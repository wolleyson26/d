const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("dotenv").config();
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const Member = require("../../models/Member");

// @route   POST api/members
// @desc    Create a new member send text
// @access  private
router.post(
  "/",
  [
    check("phone", "Phone number is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const reg = /\d+/g;

    const number = req.body.phone.match(reg).join([]);

    console.log("Phone number cleaned: ", number);

    try {
      let member = await Member.findOne({ phone: number });

      if (member) {
        return res.status(404).json({
          errors: [{ msg: "This phone number has already been registered" }]
        });
      }

      member = new Member({
        //    user:req.user.id
        phone: number
      });

      await member.save();

      //   client.messages.create({
      //     from: process.env.VERIFIED_NUMBER,
      //     to: number,
      //     body:
      //       "Thank you for signing up for <Service Name>. Please complete your profile by clicking on this link: http://192.168.1.153:3001/create-profile to start receiving points from <Company Name>"
      //   });

      res.json(member);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/members
// @desc    Get member
// @access  private
router.get("/", async (req, res) => {
  res.send("Member Get Route");
});

module.exports = router;
