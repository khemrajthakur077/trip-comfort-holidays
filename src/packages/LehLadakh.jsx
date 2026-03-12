import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const LehLadakh = () => {
  const [lehPackages, setLehPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLehData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .ilike('category', '%leh-ladakh%') 

      if (error) {
        console.error("Error fetching Leh-Ladakh packages:", error)
      } else {
        setLehPackages(data)
      }
      setLoading(false)
    }

    fetchLehData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-bold text-slate-700">Ladakh ki thandi hawayein load ho rahi hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {lehPackages.length > 0 ? (
        lehPackages.map(pkg => (
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
        <p className="text-gray-500">Database mein Leh-Ladakh ka koi package nahi mila.</p>
      )}
    </div>
  )
}

export default LehLadakh