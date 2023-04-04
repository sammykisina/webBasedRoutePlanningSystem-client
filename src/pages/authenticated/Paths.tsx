import {
  AddStop,
  Button,
  Icon,
  PathMarker,
  SpinnerLoader,
  TabTitle,
  Toasts,
  Widget,
} from '@/components';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { HiBars2, HiOutlineArrowLongRight, HiXMark } from 'react-icons/hi2';
import { useRecoilState, useRecoilValue } from 'recoil';
import { mapAtoms } from '@/atoms';
import { useAuth, useMap } from '@/hooks';
import { NavLink } from 'react-router-dom';

const Paths = () => {
  /**
   * page states
   */
  // const center = { lat: 48.8584, lng: 2.2945 };
  const showAddStopWidget = useRecoilValue(mapAtoms.showAddStopWidgetState);

  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCBC5QCMljOpRsrQ4f35ULvrld5aVkvM74',
    libraries: ['places'],
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showPathMarker, setShowPathMarker] = useRecoilState(
    mapAtoms.showPathMarkerState
  );

  const [directionResponse, setDirectionResponse] = useRecoilState(
    mapAtoms.directionResponseState
  );

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originLocationRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);
  const stopRef = useRef<HTMLInputElement | null>(null);

  const [stops, setStops] = useState<string[] | []>([]);
  const [routeWithStopsData, setRouteWithStopsData] = useState<
    google.maps.DirectionsLeg[] | null
  >(null);

  const mapHook = useMap();
  const authHook = useAuth();

  /**
   * page functions
   */

  // get current user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords?.latitude,
        lng: position.coords?.longitude,
      });
    });
  }, []);

  /**
   * find distance and time
   */
  const getPath = async () => {
    const destination = destinationRef.current?.value;
    const originLocation = originLocationRef.current?.value;

    if (originLocation === '' || destination === '') {
      Toasts.errorToast('Empty fields');
      return;
    }

    const path = await calculateDistances(
      originLocation!,
      [destination!, ...stops],
      google?.maps?.TravelMode?.DRIVING
    );

    setDirectionResponse(path);

    path?.routes[0].legs?.length === 1
      ? setRouteWithoutStops(path)
      : setRouteWithStops(path);
  };

  const setRouteWithoutStops = (path: google.maps.DirectionsResult) => {
    setDistance(path.routes[0].legs[0].distance?.text!);
    setDuration(path.routes[0].legs[0].duration?.text!);
  };

  const setRouteWithStops = (path: google.maps.DirectionsResult) => {
    setRouteWithStopsData(path?.routes[0]?.legs!);
  };

  const calculateDistances = async (
    originLocation: string,
    destinations: string[],
    travelMode: google.maps.TravelMode
  ) => {
    const service = new google.maps.DistanceMatrixService();
    const response = await service.getDistanceMatrix({
      origins: [originLocation],
      destinations: destinations,
      travelMode: travelMode,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    });

    const routes = response.rows[0];
    const sortable = [];
    for (var i = routes.elements.length - 1; i >= 0; i--) {
      var rteLength = routes.elements[i].duration.value;
      sortable.push([destinations[i], rteLength]);
    }
    sortable.sort((a: any, b: any) => a[1] - b[1]);

    const waypoints = [];
    for (var j = 0; j < sortable.length - 1; j++) {
      console.log(sortable[j][0]);
      waypoints.push({
        location: sortable[j][0],
        stopover: true,
      });
    }

    const start = originLocation;
    const end = sortable[sortable.length - 1][0];
    return await calculateRoute(start, end, waypoints);
  };

  const calculateRoute = async (
    start: string,
    end: string | number,
    waypoints: any
  ) => {
    const directionsService = new google.maps.DirectionsService();
    return await directionsService.route({
      origin: start,
      destination: end.toString(),
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    });
  };

  const clearPath = () => {
    setDirectionResponse(null);
    setStops([]);
    originLocationRef.current.value = '';
    destinationRef.current.value = '';
    setDistance('');
    setDuration('');
  };

  return (
    <section className='h-full xs:h-[40rem] flex flex-col gap-2'>
      {/* title */}
      <TabTitle title='Paths' />

      {/* body */}
      {authHook.token ? (
        <div className='h-fit rounded-[2rem]  shadow-md bg-secondary p-4 flex flex-col gap-2 relative'>
          {/* the location selection area */}
          <div className='absolute bottom-5 z-40 p-2'>
            <PathMarker
              isLoaded={isLoaded}
              map={map}
              center={center}
              findRoute={getPath}
              distance={distance}
              duration={duration}
              originLocationRef={originLocationRef}
              destinationRef={destinationRef}
              clearPath={clearPath}
              numberOfLegs={directionResponse?.routes[0].legs?.length!}
              routeWithStopsData={routeWithStopsData}
            />

            <div className='flex items-center gap-2 mt-1'>
              <Icon
                icon={
                  showPathMarker ? (
                    <HiXMark className='icon' />
                  ) : (
                    <HiBars2 className='icon' />
                  )
                }
                purpose={() => setShowPathMarker((prev) => !prev)}
                iconWrapperStyles='bg-primary text-callToAction p-2 rounded-full w-fit duration-300'
              />

              {directionResponse && showPathMarker && (
                <Button
                  title={
                    mapHook.isStoringPath ? (
                      <SpinnerLoader color='fill-primary' />
                    ) : (
                      'Save Current Route'
                    )
                  }
                  type='button'
                  intent='primary'
                  fullWidth={false}
                  purpose={() =>
                    mapHook.storePathMutateAsync({
                      path: JSON.stringify(directionResponse),
                      user_id: authHook.user?.id!,
                    })
                  }
                />
              )}
            </div>
          </div>

          {/* the map */}
          <div className='h-[42.5rem] xs:h-[36rem] '>
            {!isLoaded ? (
              'Loading'
            ) : (
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerClassName='w-full h-full rounded-[1rem]'
                onLoad={(map) => setMap(map)}
              >
                {center?.lat !== 0 && center?.lng !== 0 && (
                  <Marker position={center} />
                )}

                {directionResponse && (
                  <DirectionsRenderer directions={directionResponse} />
                )}
              </GoogleMap>
            )}
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col gap-2 rounded-[2rem] h-full  shadow-md bg-secondary py-4 px-2'>
          Please Login To Access This Page
          <NavLink to='/auth/login' className='w-fit'>
            <div className='btn'>
              <span>Login</span>

              <Icon icon={<HiOutlineArrowLongRight className='btnIcon' />} />
            </div>
          </NavLink>
        </div>
      )}

      {/* add stop widget */}
      <Widget
        widgetState={showAddStopWidget}
        component={
          <AddStop
            isLoaded={isLoaded}
            stopRef={stopRef}
            stops={stops}
            setStops={setStops}
          />
        }
        widgetStyles='w-[90vw] h-fit'
      />
    </section>
  );
};

export default Paths;
