"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, MapPin, Phone, Mail, ShoppingBag, LogOut, Pencil, Plus, Trash2, Star } from "lucide-react";
import Link from "next/link";

type Address = {
  _id: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  type: "home" | "work" | "other";
  isDefault: boolean;
};

type Order = any; // simplify for now

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", email: "", phone: "" });

  const [addrForm, setAddrForm] = useState<Partial<Address> | null>(null);
  const [addrMode, setAddrMode] = useState<"add" | "edit" | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    async function fetchData() {
      try {
        const base = process.env.NEXT_PUBLIC_API;

        const [uRes, aRes, oRes] = await Promise.all([
          fetch(`${base}/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${base}/api/addresses`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${base}/api/orders/my`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const userData = await uRes.json();
        const addrData = await aRes.json();
        const orderData = await oRes.json();

        if (!uRes.ok) throw new Error(userData.message || "Failed to load user");
        if (!aRes.ok) throw new Error(addrData.message || "Failed to load addresses");
        if (!oRes.ok) throw new Error(orderData.message || "Failed to load orders");

        setProfile(userData);
        setProfileForm({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });
        setAddresses(addrData);
        setOrders(orderData);
      } catch (err) {
        console.error(err);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  async function handleProfileSave() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }

      setProfile(data);
      localStorage.setItem("user", JSON.stringify({ id: data._id, name: data.name, email: data.email }));
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  }

  function openAddAddress() {
    setAddrMode("add");
    setAddrForm({
      label: "Home",
      name: profile?.name || "",
      phone: profile?.phone || "",
      line1: "",
      line2: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      type: "home",
      isDefault: addresses.length === 0,
    });
  }

  function openEditAddress(addr: Address) {
    setAddrMode("edit");
    setAddrForm({ ...addr });
  }

  async function saveAddress() {
    if (!addrForm) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    const isEdit = addrMode === "edit";
    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_API}/api/addresses/${addrForm._id}`
      : `${process.env.NEXT_PUBLIC_API}/api/addresses`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addrForm),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to save address");
        return;
      }

      if (isEdit) {
        setAddresses((prev) => prev.map((a) => (a._id === data._id ? data : a)));
      } else {
        setAddresses((prev) => [data, ...prev]);
      }

      setAddrForm(null);
      setAddrMode(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    }
  }

  async function deleteAddress(id: string) {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!confirm("Delete this address?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to delete address");
        return;
      }

      setAddresses((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete address");
    }
  }

  async function setDefaultAddress(id: string) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/addresses/${id}/default`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to set default address");
        return;
      }

      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a._id === id }))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to set default address");
    }
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth/login");
  }

  if (loading) return <p className="p-6 text-center">Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-8">

      {/* PROFILE HEADER */}
      <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
          <User className="text-green-600" size={40} />
        </div>

        <div className="flex-1 space-y-1">
          <h2 className="text-2xl font-bold">{profileForm.name}</h2>
          <p className="text-gray-600">{profileForm.email}</p>
          {profileForm.phone && (
            <p className="text-gray-600 flex items-center gap-2">
              <Phone size={16} /> {profileForm.phone}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Member since{" "}
            {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—"}
          </p>
        </div>

        <button
          onClick={() => setEditMode((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          <Pencil size={18} />
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* PROFILE EDIT FORM */}
      {editMode && (
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Full Name</label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Email</label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Phone</label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              />
            </div>
          </div>
          <button
            onClick={handleProfileSave}
            className="mt-3 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* ADDRESS SECTION */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Saved Addresses</h3>
          <button
            onClick={openAddAddress}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50"
          >
            <Plus size={16} /> Add New Address
          </button>
        </div>

        {addresses.length === 0 && (
          <p className="text-gray-500 text-sm">No addresses saved yet.</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="border rounded-lg p-3 text-sm space-y-1 relative"
            >
              {addr.isDefault && (
                <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={12} /> Default
                </span>
              )}
              <p className="font-semibold">{addr.label} • {addr.type.toUpperCase()}</p>
              <p>{addr.name} • {addr.phone}</p>
              <p>{addr.line1}</p>
              {addr.line2 && <p>{addr.line2}</p>}
              <p>
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              {addr.landmark && <p>Landmark: {addr.landmark}</p>}

              <div className="flex gap-3 mt-2 text-xs">
                <button
                  onClick={() => openEditAddress(addr)}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAddress(addr._id)}
                  className="text-red-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={12} /> Delete
                </button>
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(addr._id)}
                    className="text-gray-600 hover:underline"
                  >
                    Make Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Address Form */}
        {addrMode && addrForm && (
          <div className="mt-4 border-t pt-4">
            <h4 className="font-semibold text-sm mb-2">
              {addrMode === "add" ? "Add New Address" : "Edit Address"}
            </h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Label (Home / Work)</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={addrForm.label || ""}
                  onChange={(e) => setAddrForm({ ...addrForm, label: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Name</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={addrForm.name || ""}
                  onChange={(e) => setAddrForm({ ...addrForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={addrForm.phone || ""}
                  onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Flat / House / Building</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={addrForm.line1 || ""}
                  onChange={(e) => setAddrForm({ ...addrForm, line1: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Area / Locality</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={addrForm.line2 || ""}
                  onChange={(e) => setAddrForm({ ...addrForm, line2: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Landmark</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={addrForm.landmark || ""}
                  onChange={(e) => setAddrForm({ ...addrForm, landmark: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">City</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={addrForm.city || ""}
                  onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">State</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={addrForm.state || ""}
                  onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Pincode</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={addrForm.pincode || ""}
                  onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-3 flex gap-3">
              <button
                onClick={saveAddress}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
              >
                Save Address
              </button>
              <button
                onClick={() => { setAddrForm(null); setAddrMode(null); }}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ORDERS SECTION */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Your Recent Orders</h3>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500">
            <ShoppingBag size={34} className="mx-auto mb-2 text-gray-400" />
            <p>No recent orders found</p>
            <Link href="/grocery-staples" className="text-green-600 mt-3 block font-medium">
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            {orders.slice(0, 5).map((order: any) => (
              <div key={order._id} className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                  <p className="text-gray-600">
                    {order.items?.length || 0} items • ₹{order.totalAmount || 0}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.createdAt && new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <Link
                  href={`/orders/${order._id}`}
                  className="text-green-600 text-xs font-semibold hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LOGOUT */}
      <div className="bg-white shadow rounded-xl p-6">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
