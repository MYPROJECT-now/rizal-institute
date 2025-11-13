"use client";

import { useEffect, useState } from "react";
import { useAddAnnouncement, useAnnouncement, useEditAnnouncement } from "@/src/store/ADMIN/announcement";
import { deleteAnnouncement, getAnnouncement } from "@/src/actions/adminAction";
import { Button } from "@/components/ui/button";
import { Announcement_Modal } from "./announcemet_modal";
import { AddAnnouncement_Modal } from "./addAnnouncement";
import { EditAnnouncement_Modal } from "./editAnnouncement";
import { toast } from "sonner";

type Announcement = {
  announcement_id: number; // 👈 add this
  title: string;
  content: string;
  createdAt: string;
  image?: string | null;
};

type AnnouncementData = {
  id: number;
  title: string;
  content: string;
  image?: string | null;
};

export const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filtered, setFiltered] = useState<Announcement[]>([]);
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [selectedData, setSelectedData] = useState<AnnouncementData | null>(null);

  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true); // 👈 added loading state
  const [deleting, setDeleting] = useState<number | null>(null); // 👈 to track which item is being deleted
  const limit = 6;

  const { open } = useAnnouncement();
  const { open: openAdd } = useAddAnnouncement();
  const { open: openEdit } = useEditAnnouncement();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const data = await getAnnouncement();
        setAnnouncements(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleFilter = (date: string) => {
    setDateFilter(date);
    if (!date) setFiltered(announcements);
    else {
      const filteredData = announcements.filter(
        (a) => a.createdAt.slice(0, 10) === date
      );
      setFiltered(filteredData);
      setPage(1);
    }
  };

  const paginated = filtered.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filtered.length / limit);

  const openModal = (a: Announcement) => {
    setSelected(a);
    open();
  };

  const openEditModal = (b: AnnouncementData) => {
    setSelectedData(b);
    openEdit();
  };
  const handleDelete = async (announcement_id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this announcement?");
    if (!confirmDelete) return;

    try {
      setDeleting(announcement_id);
      await deleteAnnouncement(announcement_id);

      // ✅ Update UI immediately
      const updated = announcements.filter(a => a.announcement_id !== announcement_id);
      setAnnouncements(updated);
      setFiltered(updated);

      toast.success("Announcement deleted successfully!");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Failed to delete announcement.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-6">
      {/* Filter Section */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 lg:gap-4 mb-4">
        <label className="text-green-900 font-bold text-sm sm:text-lg">Filter By:</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => handleFilter(e.target.value)}
          disabled={loading}
          className="border-2 border-gray-300 rounded px-3 py-1 w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition disabled:opacity-50"
        />
        <Button
          onClick={() => handleFilter("")}
          variant="confirmButton"
          disabled={loading}
          className="rounded-lg lg:px-5 sm:px-3 px-2 lg:py-2 py-1 text-xs sm:text-sm sm:w-auto w-full"
        >
          Clear Filter
        </Button>

        <AddAnnouncement_Modal />
        <Button
          onClick={openAdd}
          variant="confirmButton"
          disabled={loading}
          className="rounded-lg lg:px-5 sm:px-3 px-2 lg:py-2 py-1 text-xs sm:text-sm sm:w-auto w-full"
        >
          Add Announcement
        </Button>


      </section>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-green-700 font-medium">Loading announcements...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Table Section */}
          <section className="overflow-x-auto min-w-[100px] shadow-lg rounded-lg border border-green-300 bg-green-50">
            <table className="w-full text-xs sm:text-sm text-center">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-2 font-semibold text-center">Title</th>
                  <th className="px-4 py-2 font-semibold text-center">Date</th>
                  <th className="px-4 py-2 font-semibold text-center">View</th>
                  <th className="px-4 py-2 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-500 py-4 bg-white">
                      No announcements found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((a, i) => (
                    <tr
                      key={i}
                      className={`${
                        i % 2 === 0 ? "bg-green-50" : "bg-white"
                      } hover:bg-green-100 transition-colors`}
                    >
                      <td className="px-4 py-2 font-medium">{a.title}</td>
                      <td className="px-4 py-2">{new Date(a.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-center">
                        <Button
                          onClick={() => openModal(a)}
                          variant="confirmButton"
                          className="rounded-lg lg:px-5 sm:px-3 px-2 lg:py-2 py-1 text-xs sm:text-sm sm:w-auto w-full"
                        >
                          Show
                        </Button>
                      </td>
                      <td className="px-4 py-2 text-center justify-center gap-3 flex flex-row">
                        <Button
                          onClick={() =>
                            openEditModal({
                              id: a.announcement_id,
                              title: a.title,
                              content: a.content,
                              image: a.image,
                            })
                          }
                          variant="confirmButton"
                          className="rounded-lg lg:px-5 sm:px-3 px-2 lg:py-2 py-1 text-xs sm:text-sm"
                        >
                          Edit
                        </Button>

                        <Button
                          onClick={() => handleDelete(a.announcement_id)}
                          disabled={deleting === a.announcement_id}                          
                          variant="rejectButton"
                          className="rounded-lg lg:px-5 sm:px-3 px-2 lg:py-2 py-1 text-xs sm:text-sm sm:w-auto w-full"
                        >
                          {deleting === a.announcement_id ? "Deleting..." : "Delete"}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          {/* Pagination Section */}
          {filtered.length > limit && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                variant="prevButton"
                className="sm:px-5 px-3 sm:py-5 py-2 rounded-lg text-xs sm:text-sm"
              >
                Previous
              </Button>

              <span className="font-medium text-gray-700">
                Page {page} of {totalPages}
              </span>

              <Button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                variant="prevButton"
                className="sm:px-5 px-3 sm:py-5 py-2 rounded-lg text-xs sm:text-sm"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {selected && (
        <Announcement_Modal
          title={selected.title}
          content={selected.content}
          image={selected.image}
          date={selected.createdAt}
        />
      )}

      {/* Modal */}
      {selectedData && (
        <EditAnnouncement_Modal
          id={selectedData.id}
          title={selectedData.title}
          content={selectedData.content}
          image={selectedData.image}
        />
      )}
    </div>
  );
};
