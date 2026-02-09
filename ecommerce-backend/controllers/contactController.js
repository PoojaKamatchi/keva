import Contact from "../models/contactModel.js";

// Admin: Save or Update Contact Info
export const saveContact = async (req, res) => {
  try {
    let info = await Contact.findOne();

    if (info) {
      // ✅ SAFE MERGE (do not overwrite with empty values)
      Object.keys(req.body).forEach((key) => {
        if (
          req.body[key] !== "" &&
          req.body[key] !== null &&
          req.body[key] !== undefined
        ) {
          info[key] = req.body[key];
        }
      });

      await info.save();
    } else {
      info = await Contact.create(req.body);
    }

    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save contact info" });
  }
};

// User: Fetch Contact Info
export const getContact = async (req, res) => {
  try {
    const info = await Contact.findOne();
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch contact info" });
  }
};
