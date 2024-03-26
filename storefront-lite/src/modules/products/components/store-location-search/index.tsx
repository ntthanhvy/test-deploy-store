import { IS_METRIC } from "@lib/constants"
import { getStoresList } from "@lib/data"
import { useQuery } from "@tanstack/react-query"
import { sortBy, uniqBy } from "lodash"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

const SIZE = 20

const StoreLocationContext = createContext<{
  place: Place | null
  setPlace: (place: Place) => void

  storesList: any[]
} | null>(null)

export const useStoreLocation = () => {
  const context = useContext(StoreLocationContext)
  if (!context) {
    throw new Error(
      "useStoreLocation must be used within a StoreLocationProvider"
    )
  }
  return context
}

type Place = google.maps.places.PlaceResult

export default function StoreLocationProvider({ children }: PropsWithChildren) {
  const [queryParams, _] = useState({ limit: 200 } as any)
  const [place, setPlace] = useState<null | Place>(null)

  const { data } = useQuery(
    [`infinite-stores`, queryParams],
    ({ pageParam }) => getStoresList({ pageParam, queryParams }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  const [storesList, setStoresList] = useState<any[]>([])

  useEffect(() => {
    if (!place || !data) return

    const location = place.geometry?.location?.toJSON()

    if (!location) return

    const service = new window.google.maps.DistanceMatrixService()

    if (!data) return

    setStoresList([])

    const handleDistanceMatrix = async () => {
      for (let i = 0; i < data.response.stores.length; i += SIZE) {
        const stores = data.response.stores.slice(i, i + SIZE)
        const destinations = stores.map(
          (s) =>
            `${s.address.city} ${
              s.address.postal_code
            }, ${s.address.country_code?.toUpperCase()}`
        )

        const request = {
          origins: [location],
          destinations,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: IS_METRIC
            ? google.maps.UnitSystem.METRIC
            : google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false,
        }

        await service.getDistanceMatrix(request).then((response) => {
          // put response

          // show on map
          const originList = response.originAddresses
          // const destinationList = response.destinationAddresses

          for (let i = 0; i < originList.length; i++) {
            const results = response.rows[i].elements

            // console.log(results)

            // geocoder
            //   .geocode({ address: originList[i] })
            //   .then(showGeocodedAddressOnMap(false))

            for (let j = 0; j < results.length; j++) {
              const element = results[j]

              if (element.status !== "OK") continue
              // geocoder
              //   .geocode({ address: destinationList[j] })
              //   .then(showGeocodedAddressOnMap(true))

              setStoresList((prev) =>
                sortBy(
                  uniqBy(
                    [
                      ...prev,
                      {
                        distance: element.distance,
                        ...stores[j],
                      },
                    ],
                    "id"
                  ),
                  (s) => s.distance.value
                )
              )
            }
          }
        })
      }
    }

    handleDistanceMatrix()
  }, [place, data])

  return (
    <StoreLocationContext.Provider
      value={{
        place,
        setPlace,
        storesList,
      }}
    >
      {children}
    </StoreLocationContext.Provider>
  )
}
