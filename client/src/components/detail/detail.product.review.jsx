import React, { useState, useMemo } from "react";
import { Progress, Rate, Pagination, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import "./detail.product.review.scss";

function ProductReview({ reviews = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalReview = reviews.length;

  const avgRating = useMemo(() => {
    if (totalReview === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / totalReview;
  }, [reviews, totalReview]);

  const starDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      dist[r.rating] = (dist[r.rating] || 0) + 1;
    });
    Object.keys(dist).forEach((star) => {
      dist[star] = totalReview ? (dist[star] / totalReview) * 100 : 0;
    });
    return dist;
  }, [reviews, totalReview]);

  const start = (currentPage - 1) * pageSize;
  const currentReviews = reviews.slice(start, start + pageSize);

  return (
    <div className="product-review-section">
      <h2>Đánh giá</h2>

      {totalReview === 0 ? (
        <p className="no-review">Chưa có đánh giá nào cho sản phẩm này.</p>
      ) : (
        <>
          <div className="review-summary">
            <div className="avg-score">
              <span className="score">{avgRating.toFixed(1)}</span>
              <Rate allowHalf disabled value={avgRating} />
              <p>{totalReview} đánh giá</p>
            </div>

            <div className="star-distribution">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="star-bar">
                  <span>{star}★</span>
                  <Progress
                    percent={starDistribution[star] || 0}
                    size="small"
                    showInfo={false}
                    strokeColor="#fadb14"
                  />
                  <span className="percent-text">
                    {(starDistribution[star] || 0).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="review-list">
            {currentReviews.map((r) => (
              <div key={r._id} className="review-item">
                <div className="user-name">
                  <strong>{r.user?.name || "Ẩn danh"}</strong>
                </div>
                <Rate disabled defaultValue={r.rating} />
                <p>{r.comment}</p>
                <div className="review-meta">
                  <span className="like">
                    <LikeOutlined /> Hữu ích
                  </span>
                  <span className="date">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-box">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalReview}
              onChange={(page) => setCurrentPage(page)}
              size="small"
            />
          </div>
        </>
      )}

      <div className="write-review-box">
        <Button type="primary" size="large" className="green-btn">
          Viết đánh giá
        </Button>
      </div>
    </div>
  );
}

export default ProductReview;
