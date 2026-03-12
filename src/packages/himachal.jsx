import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Himachal = () => {
  const [himachalPackages, setHimachalPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHimachalData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        // Isse wo saare packages milenge jinme category mein 'himachal' likha hai
        .ilike('category', '%himachal%') 

      if (error) {
        console.error("Error fetching Himachal packages:", error)
      } else {
        setHimachalPackages(data)
      }
      setLoading(false)
    }

    fetchHimachalData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-bold text-blue-600">Himachal Tours Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {himachalPackages.length > 0 ? (
        himachalPackages.map(pkg => (
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
        <p className="text-gray-500">Filhal Himachal ka koi package database mein nahi mila.</p>
      )}
    </div>
  )
}

export default Himachal