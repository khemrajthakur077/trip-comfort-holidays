import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Rajstan = () => {
  const [rajstanPackages, setRajstanPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRajstanData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        // Aapki table ki spelling 'rajstan' ke hisaab se:
        .ilike('category', '%rajstan%') 

      if (error) {
        console.error("Error fetching Rajstan packages:", error)
      } else {
        setRajstanPackages(data)
      }
      setLoading(false)
    }

    fetchRajstanData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-bold text-orange-600">Rajasthan Tours Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {rajstanPackages.length > 0 ? (
        rajstanPackages.map(pkg => (
          <PackageCard
            key={pkg.id}
            id={pkg.id} 
            image={pkg.image_url} 
            title={pkg.title}
            duration={pkg.duration}
            from={pkg.from_location} 
            to={pkg.to_location}
            hotel={pkg.hotel}
            meal={pkg.meal}
            oldPrice={pkg.old_price}
            price={pkg.price}
          />
        ))
      ) : (
        <p className="text-gray-500">Database mein Rajasthan ka koi package nahi mila.</p>
      )}
    </div>
  )
}

export default Rajstan