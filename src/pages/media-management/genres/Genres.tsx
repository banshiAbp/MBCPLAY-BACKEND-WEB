import React, { useEffect, useState } from "react";
import { getGenreList } from "../../../services/media-management/genres/getGenreList";
import { Genre } from "../../../interfaces/media-management/genre/genreType";
import { useNavigate } from "react-router-dom";
import HeaderToolbar from "../../../components/HeaderToolbar";
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
      <HeaderToolbar
        showSearchBox={true}
        showAddNewButton={true}
        showSearchTypeDropdown={true}
        searchPlaceholder="Search..."
        addNewLabel="New"
        onSearch={() => {}}
        onAddNew={() => navigate("/media-management/genres/manage-genres")}
      />
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
