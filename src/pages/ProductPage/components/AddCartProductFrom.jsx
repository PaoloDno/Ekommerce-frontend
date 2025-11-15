import { useDispatch } from "react-redux"

const AddCartForm = ({product}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const {_id} = product;
  console.log(product)
  const handleSubmit = (e) => {
    e.preventDefault();

    
  }

  return (
     <div className="fixed font-Montserrat inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-skin-colorContent rounded-lg p-5 w-[90%] md:w-[400px] shadow-lg relative">
        <h2 className="text-styleh3 font-semibold mb-3 text-center text-gray-800">
          Add the Product to Cart
        </h2>

      </div>

    </div>
  )
}