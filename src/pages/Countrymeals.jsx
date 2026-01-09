import { useNavigate, useSearchParams } from 'react-router-dom'

const countries = [
  { label: 'Indian', value: 'Indian' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Canadian', value: 'Canadian' }
]

const Countrymeals = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const activecountry = params.get('country')

  return (
    <div className="flex justify-center gap-4">
      {countries.map(c => (
        <button
          key={c.value}
          onClick={() => {if(activecountry === c.value){
          navigate(`/`)
          }else{
            navigate(`/? country=${c.value}`);
          }}
        }
          className={`px-5 py-2 rounded-full font-medium transition
            ${activecountry === c.value
              ? 'bg-emerald-700 text-white'
              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}

export default Countrymeals
