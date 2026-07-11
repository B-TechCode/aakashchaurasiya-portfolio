        import { useEffect, useState, useRef } from "react";
                import AdminLayout from "../../layouts/AdminLayout";
                import { FiCamera } from "react-icons/fi";

            import {
    getProfile,
    updateProfile,
    uploadProfileImage,
    } from "../../api/profileApi";

                export default function Profile() {

                const [profile, setProfile] = useState({
                    fullName: "",
                    headline: "",
                    email: "",
                    phone: "",
                    location: "",
                    aboutMe: "",
                    profileImageUrl: "",
                });

                const [loading, setLoading] = useState(true);
                const [uploadingImage, setUploadingImage] = useState(false);
                const fileInputRef = useRef(null);

                const [saving, setSaving] = useState(false);

                useEffect(() => {

                    loadProfile();

                }, []);

                const loadProfile = async () => {

                    try {

                    const response = await getProfile();

                   setProfile(response.data.data);

                    } catch (error) {

                    console.error(error);

                    } finally {

                    setLoading(false);

                    }

                };



                const handleSave = async () => {

            try {

                setSaving(true);

                await updateProfile(profile);

                alert("Profile updated successfully.");

            } catch (error) {

                console.error(error);

                alert("Failed to update profile.");

            } finally {

                setSaving(false);

            }

            };



            const handleImageUpload = async (event) => {

    const file = event.target.files[0];

    if (!file) return;

    try {

        setUploadingImage(true);

        const response = await uploadProfileImage(file);

        setProfile(response.data.data);

        alert("Profile image uploaded successfully.");

    } catch (error) {

        console.error(error);

        alert("Image upload failed.");

    } finally {

        setUploadingImage(false);

    }

    };




                if (loading) {

                    return (

                    <AdminLayout>

                        <div className="text-white text-xl">
                        Loading Profile...
                        </div>

                    </AdminLayout>

                    );

                }

                return (

                    <AdminLayout>

                    <div className="max-w-5xl mx-auto">

                        {/* Heading */}

                        <div className="mb-8">

                        <h1 className="text-4xl font-bold text-white">
                            Profile
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Manage your portfolio profile information.
                        </p>

                        </div>

                        {/* Card */}

                        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-10">

                        {/* Profile Image */}

                        <div className="flex flex-col items-center mb-10">

                            <div className="relative">

                        <img
    src={
        profile.profileImageUrl
        ? profile.profileImageUrl
        : "https://avatars.githubusercontent.com/u/9919?v=4"
    }
    alt="Profile"
    className="w-40 h-40 rounded-full object-cover border-4 border-slate-700"
    />

                    <button
    type="button"
    disabled={uploadingImage}
    onClick={() => fileInputRef.current.click()}
    className={`absolute bottom-2 right-2 p-3 rounded-full transition ${
        uploadingImage
        ? "bg-slate-600 cursor-not-allowed"
        : "bg-cyan-500 hover:bg-cyan-600"
    }`}
    >
    <FiCamera className="text-white text-lg" />
    </button>



    <input
    type="file"
    ref={fileInputRef}
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
    />



                            </div>

                        </div>

                        {/* Form */}

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                            <label className="text-slate-300 mb-2 block">
                                Full Name
                            </label>

                            <input
                type="text"
                value={profile.fullName || ""}
                onChange={(e) =>
                    setProfile({
                    ...profile,
                    fullName: e.target.value,
                    })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
                placeholder="Full Name"
                />

                            </div>

                            <div>

                            <label className="text-slate-300 mb-2 block">
                                Headline
                            </label>

                            <input
                type="text"
                value={profile.headline || ""}
                onChange={(e) =>
                    setProfile({
                    ...profile,
                    headline: e.target.value,
                    })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
                placeholder="Headline"
                />

                            </div>

                            <div>

                            <label className="text-slate-300 mb-2 block">
                                Email
                            </label>

                        <input
                type="email"
                value={profile.email || ""}
                onChange={(e) =>
                    setProfile({
                        ...profile,
                        email: e.target.value,
                    })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
                placeholder="Email"
            />

                            </div>

                            <div>

                            <label className="text-slate-300 mb-2 block">
                                Phone
                            </label>

                            <input
                type="text"
                value={profile.phone || ""}
                onChange={(e) =>
                    setProfile({
                        ...profile,
                        phone: e.target.value,
                    })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
                placeholder="Phone"
            />

                            </div>

                            <div className="md:col-span-2">

                            <label className="text-slate-300 mb-2 block">
                                Location
                            </label>

                            <input
                type="text"
                value={profile.location || ""}
                onChange={(e) =>
                    setProfile({
                        ...profile,
                        location: e.target.value,
                    })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
                placeholder="Location"
            />

                            </div>

                            <div className="md:col-span-2">

                            <label className="text-slate-300 mb-2 block">
                                About Me
                            </label>
            <textarea
                rows="6"
                value={profile.aboutMe || ""}
                onChange={(e) =>
                    setProfile({
                        ...profile,
                        aboutMe: e.target.value,
                    })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
                placeholder="Write something about yourself..."
            />

                            </div>

                        </div>

                        <div className="mt-8 flex justify-end">

                        <button
            onClick={handleSave}
            disabled={saving}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 px-8 py-3 rounded-lg text-white font-semibold transition"
            >
            {saving ? "Saving..." : "Save Changes"}
            </button>

                        </div>

                        </div>

                    </div>

                    </AdminLayout>

                );

                }