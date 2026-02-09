import Machine from "../models/machineModel.js";

// GET ALL MACHINES (USER)
export const getMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE MACHINE (ADMIN)
export const createMachine = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const machine = await Machine.create({
      name,
      description,
      image: `uploads/${req.file.filename}`, // ✅ CORRECT
    });

    res.status(201).json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE MACHINE
export const updateMachine = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) return res.status(404).json({ message: "Not found" });

    machine.name = req.body.name || machine.name;
    machine.description = req.body.description || machine.description;

    if (req.file) {
      machine.image = `uploads/${req.file.filename}`;
    }

    const updated = await machine.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE MACHINE
export const deleteMachine = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) return res.status(404).json({ message: "Not found" });

    await machine.deleteOne();
    res.json({ message: "Machine deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
