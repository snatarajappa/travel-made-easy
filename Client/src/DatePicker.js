import { Form } from 'react-bootstrap';
import { createSearchParams, useNavigate } from "react-router-dom";

const DatePicker = ({ label, date, setDate, searchParams }) => {
    let navigate = useNavigate();
    const onChange = (e) => {
        setDate(e.target.value);
        searchParams.set(label.toLowerCase(),e.target.value);
        if (searchParams.get('place_name')) {
            const params = { place_name: searchParams.get('place_name'), from: searchParams.get('from'), to:searchParams.get('to') };
            navigate({
                pathname: '/search',
                search: `?${createSearchParams(params)}`,
            });
        }
        e.preventDefault();
    };

    return (
        <div>
            <Form.Group controlId={label.toLowerCase()}>
                <span>{label}</span>
                <Form.Control
                    type="date"
                    name={label.toLowerCase()}
                    value={date}
                    placeholder={label}
                    onChange={onChange} />
            </Form.Group>
        </div>
    )
};

export default DatePicker;