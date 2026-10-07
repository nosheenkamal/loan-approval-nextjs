"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    Gender: "Male",
    Married: "Yes",
    Dependents: "0",
    Education: "Graduate",
    Self_Employed: "No",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "360",
    Credit_History: "1",
    Property_Area: "Urban",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ApplicantIncome: Number(formData.ApplicantIncome),
          CoapplicantIncome: Number(formData.CoapplicantIncome),
          LoanAmount: Number(formData.LoanAmount),
          Loan_Amount_Term: Number(formData.Loan_Amount_Term),
          Credit_History: Number(formData.Credit_History),
        }),
      });

      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      setResult("Error connecting to the backend");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Loan Approval Prediction
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Enter the applicant details to predict loan approval.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Gender
            </label>
            <select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Married
            </label>
            <select
              name="Married"
              value={formData.Married}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Dependents
            </label>
            <select
              name="Dependents"
              value={formData.Dependents}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Education
            </label>
            <select
              name="Education"
              value={formData.Education}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option>Graduate</option>
              <option>Not Graduate</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Self Employed
            </label>
            <select
              name="Self_Employed"
              value={formData.Self_Employed}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Applicant Income
            </label>
            <input
              type="number"
              name="ApplicantIncome"
              value={formData.ApplicantIncome}
              onChange={handleChange}
              placeholder="e.g. 5000"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Coapplicant Income
            </label>
            <input
              type="number"
              name="CoapplicantIncome"
              value={formData.CoapplicantIncome}
              onChange={handleChange}
              placeholder="e.g. 2000"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Loan Amount
            </label>
            <input
              type="number"
              name="LoanAmount"
              value={formData.LoanAmount}
              onChange={handleChange}
              placeholder="e.g. 150"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Loan Amount Term
            </label>
            <select
              name="Loan_Amount_Term"
              value={formData.Loan_Amount_Term}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option value="360">360</option>
              <option value="180">180</option>
              <option value="120">120</option>
              <option value="60">60</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Credit History
            </label>
            <select
              name="Credit_History"
              value={formData.Credit_History}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option value="1">Good (1)</option>
              <option value="0">Bad (0)</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Property Area
            </label>
            <select
              name="Property_Area"
              value={formData.Property_Area}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option>Urban</option>
              <option>Semiurban</option>
              <option>Rural</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Predicting..." : "Predict Loan Approval"}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8 rounded-xl bg-gray-100 p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Prediction Result
            </h2>

            <p className="mt-3 text-3xl font-bold">
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}