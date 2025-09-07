import React, { useEffect, useState } from "react";
import { getGenreList } from "../../../services/media-management/genres/getGenreList";
import { Genre } from "../../../interfaces/media-management/genre/genreType";
import { FaFilter, FaFileExport } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { transformGenreList } from "../../../interfaces/media-management/genre/genreTransform";
import Breadcrumb from "../../../components/Breadcrumb";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import ToggleSwitch from "../../../components/ToggleSwitch";
import DetailsPopup from "../../../components/DetailsPopup";
import "../../../styles/media-management/genres.scss";

const Genres: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [descModal, setDescModal] = useState<{ open: boolean; text: string }>({
    open: false,
    text: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchGenres(token, currentPage);
    }
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchGenres = async (token: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getGenreList({
        page,
        token,
      });
      setGenres(transformGenreList(data.data.genres || []));
      setTotalPages(data.data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Failed to fetch genres.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="genres-page">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Media Management", path: "/media-management" },
          { label: "Genres" },
        ]}
      />
      <h2 className="genres-title">Genres</h2>
      {/* Action/Filter Row */}
      <div className="genres-action-row">
        <select className="genres-action-select">
          <option>Action</option>
          <option>Delete</option>
          <option>Export</option>
        </select>
        <button className="genres-apply-btn">Apply</button>
        <button className="genres-export-btn">
          <span className="genres-btn-icon">
            <FaFileExport />
          </span>
          Export
        </button>
        <div className="genres-action-spacer" />
        <select className="genres-filter-select">
          <option>All</option>
          <option>Enabled</option>
          <option>Disabled</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="genres-search-input"
        />
        <button className="genres-advanced-filter-btn">
          <span className="genres-btn-icon">
            <FaFilter />
          </span>
          Advanced Filter
        </button>
        <button
          className="genres-new-btn"
          onClick={() => navigate("/media-management/genres/manage-genres")}
        >
          <span className="genres-btn-icon">
            <FaCirclePlus />
          </span>
          New
        </button>
      </div>
      {error && (
        <StatusMessage
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
      {loading ? (
        <Loader visible={true} />
      ) : (
        <div className="genres-table-wrapper">
          <table className="genres-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Code</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {genres.length === 0 ? (
                <tr>
                  <td colSpan={3} className="no-data">
                    No genres found.
                  </td>
                </tr>
              ) : (
                genres.map((genre) => {
                  const desc = genre.genreDescription || "";
                  return (
                    <tr key={genre.id}>
                      <td>{genre.genreTitle}</td>
                      <td>
                        {desc.length > 20 ? (
                          <>
                            {desc.slice(0, 20)}
                            <span
                              className="genres-table-description-more"
                              onClick={() =>
                                setDescModal({ open: true, text: desc })
                              }
                            >
                              ...
                            </span>
                          </>
                        ) : (
                          desc
                        )}
                      </td>
                      <td>{genre.genreCode}</td>
                      <td>
                        <ToggleSwitch
                          checked={genre.genreStatus}
                          onChange={() => {}}
                        />
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(
                              `/media-management/genres/manage-genres/${genre.id}`
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <DetailsPopup
            open={descModal.open}
            title="Description"
            details={descModal.text}
            onClose={() => setDescModal({ open: false, text: "" })}
          />
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Genres;
