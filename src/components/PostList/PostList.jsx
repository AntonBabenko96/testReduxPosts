import React, { useEffect, useState } from "react";
import { useGetAllPostsQuery, useGetPostsQuery } from "../../redux";
import styles from "./PostList.module.scss";

export default function PostList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, _] = useState(10);

  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = useGetPostsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const { data: allPosts } = useGetAllPostsQuery();

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  function handleRefresh() {
    refetch();
  }

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  function renderPagination() {
    if (!allPosts) return null;

    const totalPages = Math.ceil(allPosts.length / itemsPerPage);

    return (
      <div className={styles.paginationWrapper}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.backBtn}
        >
          Назад
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={`${page}-page`}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              className={styles.paginationBtn}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.nextBtn}
        >
          Вперед
        </button>
      </div>
    );
  }

  if (isLoading) return <p className={styles.loadingMessage}>Loading...</p>;
  if (error)
    return <p className={styles.errorMessage}>Error: {error.message}</p>;

  return (
    <div className={styles.testWrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Posts</h2>
        <button onClick={handleRefresh} className={styles.refreshBtn}>
          Refresh
        </button>
      </div>

      <ul className={styles.postList}>
        {posts.map((item) => (
          <li key={item.id} className={styles.postItem}>
            <h1 className={styles.postTitle}>{item.title}</h1>
            <p className={styles.postDesc}>{item.body}</p>
          </li>
        ))}
      </ul>
      {renderPagination()}
    </div>
  );
}
