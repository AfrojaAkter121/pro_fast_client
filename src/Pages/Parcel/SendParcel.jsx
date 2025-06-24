import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import coverageData from "../../../public/coverageData.json";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SendParcel = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const generateTrackingId = () => {
    const prefix = "TRK";
    const random = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    const timestamp = Date.now().toString().slice(-4); // last 4 digits of timestamp
    return `${prefix}-${random}-${timestamp}`;
  };

  const uniqueRegions = [...new Set(coverageData.map((item) => item.region))];
  const serviceCenters = [...new Set(coverageData.map((item) => item.city))];

  const parcelType = watch("type");
  const isDocument = parcelType === "document";

  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [cost, setCost] = useState(0);

  // 📌 Cost Calculation Helper
  const calculateCost = (type, weight = 0, senderCity, receiverCity) => {
    const isWithinCity = senderCity === receiverCity;
    let cost = 0;
    let details = "";

    if (type === "document") {
      cost = isWithinCity ? 60 : 80;
      details = `Document Parcel (${
        isWithinCity ? "Within City" : "Outside City"
      }): ৳${cost}`;
    } else {
      const w = parseFloat(weight || 0);
      if (w <= 3) {
        cost = isWithinCity ? 110 : 150;
        details = `Non-Document (≤3kg) - ${
          isWithinCity ? "Within City" : "Outside City"
        }: ৳${cost}`;
      } else {
        const extraKg = w - 3;
        if (isWithinCity) {
          cost = 110 + extraKg * 40;
          details = `Non-Document (>3kg) - Within City: ৳110 + (৳40 x ${extraKg}) = ৳${cost}`;
        } else {
          cost = 150 + extraKg * 40 + 40;
          details = `Non-Document (>3kg) - Outside City: ৳150 + (৳40 x ${extraKg}) + ৳40 extra = ৳${cost}`;
        }
      }
    }

    return { cost, details };
  };

  const onSubmit = (data) => {
    const { type, weight, senderWarehouse, receiverWarehouse } = data;
    const { cost, details } = calculateCost(
      type,
      weight,
      senderWarehouse,
      receiverWarehouse
    );

    setCost(cost);
    setFormData({
      ...data,
      creation_date: new Date().toISOString(),
      cost,
    });
    setShowConfirm(true);

    Swal.fire({
      icon: "info",
      title: `📦 Estimated Cost: ৳${cost}`,
      html: `
        <div style="text-align: left; line-height: 1.6;">
          <strong style="color:#10b981;">📌 Pricing Policy:</strong><br/>
          &nbsp;• Document: <strong>৳60</strong> (within), <strong>৳80</strong> (outside)<br/>
          &nbsp;• Non-Document ≤3kg: <strong>৳110</strong> (within), <strong>৳150</strong> (outside)<br/>
          &nbsp;• Non-Document >3kg: <strong>+৳40/kg</strong> (within), <strong>+৳40/kg +৳40 extra</strong> (outside)<br/><br/>
    
          <strong style="color:#3b82f6;">🧮 Calculation:</strong><br/>
          ${details}
        </div>
      `,
      confirmButtonText: "✅ OK",
      confirmButtonColor: "#22c55e",
    });
  };
  const handleConfirm = async () => {
    const trackingId = generateTrackingId();

    const parcelData = {
      ...formData,
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email || "No Email",
      payment_status: "unpaid",
      delivery_status: "pending",
      trackingId,
    };

    try {
      const res = await axiosSecure.post(`${import.meta.env.VITE_API}/parcels`, parcelData);

      if (res.data.ok || res.data.insertedId) {
        // TODO: redirect to a payment page or show success message
        Swal.fire({
          icon: "success",
          title: "🎉 Parcel Sent Successfully!",
          html: `Tracking ID: <strong>${trackingId}</strong>`,
          confirmButtonText: "OK",
        });
        reset();
        setShowConfirm(false);
      } else {
        throw new Error("Failed to insert parcel data");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "❌ Error",
        text: error.message,
      });
    }
  };

  // Helper to render error messages below inputs
  const renderError = (fieldName) => {
    if (!errors[fieldName]) return null;
    return (
      <p className="text-red-600 text-sm mt-1">
        {errors[fieldName].type === "required" && "This field is required."}
        {errors[fieldName].type === "pattern" && "Invalid format."}
        {errors[fieldName].type === "min" && "Value is too low."}
        {/* Add more error types if needed */}
      </p>
    );
  };

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-4xl font-bold text-center mb-2 text-[#0B1A29]">
          Add Parcel
        </h2>
        <p className="text-center text-gray-500 mb-8 text-lg">
          Enter your parcel details
        </p>

        {/* Type Selection */}
        <div className="flex items-center gap-6 justify-center mb-8">
          <label className="label cursor-pointer">
            <input
              type="radio"
              value="document"
              {...register("type", { required: true })}
              className="radio checked:bg-green-500"
            />
            <span className="ml-2">Document</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              value="non-document"
              {...register("type", { required: true })}
              className="radio checked:bg-green-500"
            />
            <span className="ml-2">Non-Document</span>
          </label>
        </div>
        {renderError("type")}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Parcel Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="Parcel Name"
                {...register("parcelName", { required: true })}
                className={`input input-bordered w-full ${
                  errors.parcelName ? "input-error" : ""
                }`}
              />
              {renderError("parcelName")}
            </div>

            <div>
              <input
                type="number"
                placeholder="Weight (kg)"
                step="0.1"
                {...register("weight", {
                  required: !isDocument,
                  min: 0.1,
                })}
                disabled={isDocument}
                className={`input input-bordered w-full ${
                  errors.weight ? "input-error" : ""
                }`}
              />
              {renderError("weight")}
            </div>
          </div>

          {/* Sender & Receiver Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sender */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold text-[#0B1A29] mb-3">
                Sender Details
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Sender Name"
                    {...register("senderName", { required: true })}
                    className={`input input-bordered w-full ${
                      errors.senderName ? "input-error" : ""
                    }`}
                  />
                  {renderError("senderName")}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    {...register("senderContact", {
                      required: true,
                      pattern: /^[0-9]{10,14}$/,
                    })}
                    className={`input input-bordered w-full ${
                      errors.senderContact ? "input-error" : ""
                    }`}
                  />
                  {errors.senderContact?.type === "pattern" && (
                    <p className="text-red-600 text-sm mt-1">
                      Contact must be 10-14 digits.
                    </p>
                  )}
                  {renderError("senderContact")}
                </div>
                <div>
                  <select
                    {...register("senderRegion", { required: true })}
                    className={`select select-bordered w-full ${
                      errors.senderRegion ? "select-error" : ""
                    }`}
                  >
                    <option value="">Select Region</option>
                    {uniqueRegions.map((region, idx) => (
                      <option key={idx} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {renderError("senderRegion")}
                </div>
                <div>
                  <select
                    {...register("senderWarehouse", { required: true })}
                    className={`select select-bordered w-full ${
                      errors.senderWarehouse ? "select-error" : ""
                    }`}
                  >
                    <option value="">Select Service Center</option>
                    {serviceCenters.map((center, index) => (
                      <option key={index} value={center}>
                        {center}
                      </option>
                    ))}
                  </select>
                  {renderError("senderWarehouse")}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("senderAddress", { required: true })}
                    className={`input input-bordered w-full ${
                      errors.senderAddress ? "input-error" : ""
                    }`}
                  />
                  {renderError("senderAddress")}
                </div>
                <div>
                  <textarea
                    {...register("pickupInstruction", { required: true })}
                    className={`textarea textarea-bordered w-full ${
                      errors.pickupInstruction ? "textarea-error" : ""
                    }`}
                    placeholder="Pickup Instruction"
                  ></textarea>
                  {renderError("pickupInstruction")}
                </div>
              </div>
            </div>

            {/* Receiver */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold text-[#0B1A29] mb-3">
                Receiver Details
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Receiver Name"
                    {...register("receiverName", { required: true })}
                    className={`input input-bordered w-full ${
                      errors.receiverName ? "input-error" : ""
                    }`}
                  />
                  {renderError("receiverName")}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    {...register("receiverContact", {
                      required: true,
                      pattern: /^[0-9]{10,14}$/,
                    })}
                    className={`input input-bordered w-full ${
                      errors.receiverContact ? "input-error" : ""
                    }`}
                  />
                  {errors.receiverContact?.type === "pattern" && (
                    <p className="text-red-600 text-sm mt-1">
                      Contact must be 10-14 digits.
                    </p>
                  )}
                  {renderError("receiverContact")}
                </div>
                <div>
                  <select
                    {...register("receiverRegion", { required: true })}
                    className={`select select-bordered w-full ${
                      errors.receiverRegion ? "select-error" : ""
                    }`}
                  >
                    <option value="">Select Region</option>
                    {uniqueRegions.map((region, idx) => (
                      <option key={idx} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {renderError("receiverRegion")}
                </div>
                <div>
                  <select
                    {...register("receiverWarehouse", { required: true })}
                    className={`select select-bordered w-full ${
                      errors.receiverWarehouse ? "select-error" : ""
                    }`}
                  >
                    <option value="">Select Service Center</option>
                    {serviceCenters.map((center, index) => (
                      <option key={index} value={center}>
                        {center}
                      </option>
                    ))}
                  </select>
                  {renderError("receiverWarehouse")}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("receiverAddress", { required: true })}
                    className={`input input-bordered w-full ${
                      errors.receiverAddress ? "input-error" : ""
                    }`}
                  />
                  {renderError("receiverAddress")}
                </div>
                <div>
                  <textarea
                    {...register("deliveryInstruction", { required: true })}
                    className={`textarea textarea-bordered w-full ${
                      errors.deliveryInstruction ? "textarea-error" : ""
                    }`}
                    placeholder="Delivery Instruction"
                  ></textarea>
                  {renderError("deliveryInstruction")}
                </div>
              </div>
            </div>
          </div>

          {/* Note & Submit */}
          <div className="text-sm text-gray-500 text-center mb-4">
            * PickUp Time: 4pm–7pm Approx.
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn bg-lime-400 text-white hover:bg-lime-500 px-10"
            >
              Continue
            </button>
          </div>
        </form>

        {/* Confirmation UI */}
        {showConfirm && (
          <div className="mt-6 text-center">
            <div className="alert alert-info shadow-lg mb-4">
              <span>Total Cost: ৳{cost}. Click confirm to proceed.</span>
            </div>
            <button onClick={handleConfirm} className="btn btn-success px-8">
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendParcel;
