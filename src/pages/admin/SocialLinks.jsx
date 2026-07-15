import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAllSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../../api/socialLinkApi";

export default function SocialLinks() {

  const [links, setLinks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    platform: "",
    url: "",
    displayOrder: 0,
  });

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {

      const response = await getAllSocialLinks();

      setLinks(response.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const resetForm = () => {
    setForm({
      platform: "",
      url: "",
      displayOrder: 0,
    });

    setEditingId(null);
  };

  const handleSubmit = async () => {

    if (!form.platform.trim()) {

    return toast.error(
        "Platform is required."
    );

}

if (!form.url.trim()) {

    return toast.error(
        "URL is required."
    );

}

if (
    !form.url.startsWith("http://") &&
    !form.url.startsWith("https://")
) {

    return toast.error(
        "URL must start with http:// or https://"
    );

}

    try {

      setSaving(true);

      if (editingId) {

        await updateSocialLink(editingId, form);

      } else {

        await createSocialLink(form);

      }

      resetForm();

      loadLinks();


      toast.success(
    editingId
        ? "Social link updated successfully."
        : "Social link created successfully."
);

    } catch (error) {

      console.error(error);

      toast.error(
    error.response?.data?.message ||
    "Operation failed."
);

    } finally {

      setSaving(false);

    }

  };

  const handleEdit = (link) => {

    setEditingId(link.id);

    setForm({
      platform: link.platform,
      url: link.url,
      displayOrder: link.displayOrder,
    });

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this social link?")) return;

    try {

     await loadLinks();

toast.success(
    "Social link deleted successfully."
);

    } catch (error) {

     console.error(error);

toast.error(
    error.response?.data?.message ||
    "Failed to delete social link."
);

    }

  };

  return (

    <AdminLayout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-8">
          Social Links
        </h1>

        {/* Form */}

        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">

          <div className="grid md:grid-cols-3 gap-5">

            <input
              placeholder="Platform"
              value={form.platform}
              onChange={(e)=>
                setForm({...form,platform:e.target.value})
              }
              className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
            />

            <input
              placeholder="URL"
              value={form.url}
              onChange={(e)=>
                setForm({...form,url:e.target.value})
              }
              className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
            />

            <input
              type="number"
              placeholder="Display Order"
              value={form.displayOrder}
              onChange={(e)=>
                setForm({...form,displayOrder:e.target.value})
              }
              className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div className="flex gap-3 mt-6">

            <button
              disabled={saving}
              onClick={handleSubmit}
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg text-white font-semibold"
            >
              {editingId ? "Update" : "Create"}
            </button>

            {editingId && (

              <button
                onClick={resetForm}
                className="bg-slate-700 px-8 py-3 rounded-lg text-white"
              >
                Cancel
              </button>

            )}

          </div>

        </div>

        {/* Table */}

        <div className="bg-slate-800 rounded-2xl border border-slate-700 mt-10 overflow-hidden">

          {loading ? (

            <div className="p-8 text-white">
              Loading...
            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-slate-900">

                <tr>

                  <th className="p-4 text-left text-slate-300">
                    Platform
                  </th>

                  <th className="p-4 text-left text-slate-300">
                    URL
                  </th>

                  <th className="p-4 text-left text-slate-300">
                    Order
                  </th>

                  <th className="p-4 text-center text-slate-300">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {links.map((link)=>(

                  <tr
                    key={link.id}
                    className="border-t border-slate-700"
                  >

                    <td className="p-4 text-white">
                      {link.platform}
                    </td>

                    <td className="p-4">

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400"
                      >
                        {link.url}
                      </a>

                    </td>

                    <td className="p-4 text-white">
                      {link.displayOrder}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={()=>handleEdit(link)}
                          className="bg-cyan-600 px-4 py-2 rounded text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={()=>handleDelete(link.id)}
                          className="bg-red-600 px-4 py-2 rounded text-white"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </AdminLayout>

  );

}