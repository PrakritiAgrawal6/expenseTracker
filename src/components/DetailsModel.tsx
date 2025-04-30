
const DetailsModel = ({ selectedMedicine, setShowModal }: any) => {
    return (
        <div>


            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-xl font-bold mb-4">Medicine Details</h2>
                    <p><strong>Name:</strong> {selectedMedicine.name}</p>
                    <p><strong>Description:</strong> {selectedMedicine.description}</p>
                    <p><strong>Price:</strong> {selectedMedicine.price}</p>
                    <p><strong>Doses:</strong> {selectedMedicine.doses}</p>
                    <p><strong>Side Effect:</strong> {selectedMedicine.sideEffect}</p>
                    <p><strong>Stock:</strong> {selectedMedicine.stock}</p>
                    <p><strong>Manufactured Date:</strong> {new Date(selectedMedicine.manufactured_date).toLocaleDateString()}</p>
                    <p><strong>Expire Date:</strong> {new Date(selectedMedicine.expire_date).toLocaleDateString()}</p>
                    <p><strong>Manufactured By:</strong> {selectedMedicine.manufactured_by}</p>
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        // onClick={() => addToCart(selectedMedicine)}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DetailsModel