import useHttp from '../../hooks/useHttp.js'
import MedicineItem from './MedicineItem.jsx';
import Error from './Error.jsx';
const requestConfig = {};
const Medicines = () => {
    const {
        data: loadedMedicines,
        isLoading,
        error,
    } = useHttp('http://localhost:5000/api/products', requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching medicines...</p>;
    }
    if (error) {
        return <Error title="Failed to fetch medicines" message={error} />;
    }
    return (
        <ul id="medicine">
            {loadedMedicines.map(medicine => (
                <MedicineItem key={medicine._id} medicine={medicine} />
            ))}
        </ul>
    )
}

export default Medicines;