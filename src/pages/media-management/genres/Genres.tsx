import React, { useEffect, useState } from "react";
import { getGenreList } from "../../../services/media-management/genres/getGenreList";
import { Genre } from "../../../interfaces/media-management/genre/genreType";
import { useNavigate } from "react-router-dom";
import HeaderToolbar from "../../../components/HeaderToolbar";
import { transformGenreList } from "../../../interfaces/media-management/genre/genreTransform";
import Breadcrumb from "../../../components/Breadcrumb";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import CommonTable, { TableColumn } from "../../../components/CommonTable";
import "../../../styles/media-management/genres.scss";

const Genres: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Define table columns
  const columns: TableColumn[] = [
    { key: "genreTitle", label: "Title" },
    { key: "genreDescription", label: "Description" },
    { key: "genreCode", label: "Code" },
    { key: "genreStatus", label: "Status" },
    { key: "action", label: "Action" },
  ];

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

  const handleStatusToggle = (id: string) => {
    setGenres((prev) =>
      prev.map((genre) => (genre.id === id ? { ...genre, genreStatus: !genre.genreStatus } : genre))
    );
    // TODO: Implement status update API call
  };

  const handleEdit = (id: string) => {
    navigate(`/media-management/genres/manage-genres/${id}`);
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
        searchPlaceholder="Search Genre..."
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
      <CommonTable
        columns={columns}
        data={genres}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onStatusToggle={handleStatusToggle}
        onEdit={handleEdit}
        noDataMessage="No genres found."
        className="genres-table-wrapper"
      />
    </div>
  );
};

export default Genres;
