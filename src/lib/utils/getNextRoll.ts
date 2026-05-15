import CounterModel from "@/src/models/counter.model";

export async function getNextRoll() {
    const counter = await CounterModel.findOneAndUpdate(
        { key: "student_roll" },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
    );

    return counter.value;
}

export function formatRollNumber(rollNumber: number) {
    return rollNumber.toString().padStart(3, "0");
}
