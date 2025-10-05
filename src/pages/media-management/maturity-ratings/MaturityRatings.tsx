import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getMaturityRatingList } from "../../../services/media-management/maturity-ratings/getMaturityRatingList";
import { MaturityRating } from "../../../interfaces/media-management/maturity-rating/maturityRatingType";
import { transformMaturityRatingList } from "../../../interfaces/media-management/maturity-rating/maturityRatingTransform";
import HeaderToolbar from "../../../components/HeaderToolbar";
import Breadcrumb from "../../../components/Breadcrumb";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import CommonTable, { TableColumn } from "../../../components/CommonTable";
import "../../../styles/media-management/maturity-ratings.scss";

const MaturityRatings: React.FC = () => {
  const [maturityRatings, setMaturityRatings] = useState<MaturityRating[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  // Define table columns
  const columns: TableColumn[] = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "code", label: "Code" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  useEffect(() => {
    if (!token) return;
    fetchMaturityRatings(currentPage);
  }, [currentPage, token]);

  const fetchMaturityRatings = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getMaturityRatingList({
        page,
      });
      setMaturityRatings(transformMaturityRatingList(data.data.maturity_ratings || []));
      setTotalPages(data.data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Failed to fetch maturity ratings.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = (id: string) => {
    setMaturityRatings((prev) =>
      prev.map((rating) => (rating.id === id ? { ...rating, status: !rating.status } : rating))
    );
    // TODO: Implement status update API call
  };

  const handleEdit = (id: string) => {
    navigate(`/media-management/maturity-ratings/manage/${id}`);
  };

  return (
    <div className="maturity-ratings-page">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Media Management", path: "/media-management" },
          { label: "Maturity Ratings" },
        ]}
      />
      <h2 className="maturity-ratings-title">Maturity Ratings</h2>
      <HeaderToolbar
        showSearchBox={true}
        showAddNewButton={true}
        showSearchTypeDropdown={true}
        searchPlaceholder="Search Maturity Rating..."
        addNewLabel="New"
        onSearch={() => {}}
        onAddNew={() => navigate("/media-management/maturity-ratings/manage")}
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
        data={maturityRatings}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onStatusToggle={handleStatusToggle}
        onEdit={handleEdit}
        noDataMessage="No maturity ratings found."
        className="maturity-ratings-table-wrapper"
      />
    </div>
  );
};

export default MaturityRatings;
