import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
// ✅ ঠিক পথে import করো

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API}/parcels?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email, // ensures query only runs when email is available
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `${import.meta.env.VITE_API}/parcels/${id}`
          );
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
            // Refetch parcels after delete
            queryClient.invalidateQueries(["parcels", user?.email]);
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete parcel.", error);
        }
      }
    });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-lg">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>#</th>
            <th>Parcel</th>
            <th>From → To</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>
                <p className="capitalize">{parcel.type}</p>
                <p className="text-sm text-gray-500">{parcel.parcelName}</p>
              </td>
              <td>
                <p>
                  {parcel.senderRegion} → {parcel.receiverRegion}
                </p>
                <p className="text-xs text-gray-500">
                  {parcel.senderName} → {parcel.receiverName}
                </p>
              </td>
              <td>৳{parcel.cost}</td>
              <td>
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0">
                  <span
                    className={`badge ${
                      parcel.delivery_status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    } whitespace-nowrap`}
                  >
                    Delivery: {parcel.delivery_status}
                  </span>
                  <span
                    className={`badge ${
                      parcel.payment_status === "unpaid"
                        ? "badge-error"
                        : "badge-success"
                    } whitespace-nowrap`}
                  >
                    Payment: {parcel.payment_status}
                  </span>
                </div>
              </td>

              <td>{new Date(parcel.creation_date).toLocaleString()}</td>
              <td>
                <div className="flex gap-2 justify-center">
                  <button
                    //   onClick={() => onDetails(parcel)}
                    className="btn btn-xs btn-info"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
