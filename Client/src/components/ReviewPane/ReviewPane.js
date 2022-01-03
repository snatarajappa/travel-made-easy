import Card from "react-bootstrap/Card";
import './ReviewPane.css';
const ReviewPane = (reviewData) => {
    if (reviewData.reviewData != null && reviewData.reviewData.length > 0) {
        return (
            <div>
                {reviewData.reviewData.map((review) => (
                    <Card>
                        <Card.Body className="review-header">
                            <Card.Title className="reviewer">{review._source.reviewer}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted contributions">{review._source.contributions} Contributions</Card.Subtitle>
                        </Card.Body>
                        <Card.Body>
                            <Card.Title className="review-title">{review._source.review_title}</Card.Title>
                            <Card.Text className="comment" dangerouslySetInnerHTML={{ __html: review._source.comment }}></Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <Card>
                    <Card.Body className="review-header">
                        <Card.Title className="no-data">Sorry!, We don't have enough data to show.</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        );
    }

};
export default ReviewPane;