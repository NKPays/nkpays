/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import GoogleMapReact from 'google-map-react';
import { api } from '@/utils/api';
import Loading from '../shared/Loading';
import { GoogleMapExtensionOutput } from '@/schema/extension.schema';

const GoogleMapWidget = () => {
    const { data, isLoading } = api.extension.get.useQuery<GoogleMapExtensionOutput | null, GoogleMapExtensionOutput | null>({ title: 'google_map' })
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    // if (isLoading) {
    //     return <div className='flex justify-center items-center w-full h-full'>
    //         <Loading />
    //     </div>
    // }

    // if (!data) {
    //     return (
    //         <div className='flex justify-center items-center w-full h-full '>
    //             Google Map
    //         </div>
    //     )
    // }

    return (
        <div className='h-full w-full'>
            {/* <GoogleMapReact
             bootstrapURLKeys={{ key: "" }}
             defaultCenter={{lat: Number(data.data.latitude), lng:Number( data.data.longitude)}}
             defaultZoom={defaultProps.zoom}
            >

            </GoogleMapReact> */}

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.7988520037716!2d94.18151777542843!3d26.59082927684053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3746ef3ee8964281%3A0xe0125100f6d03c69!2sNKPAYS%20PRIVATE%20LIMITED!5e0!3m2!1shi!2sin!4v1708789340660!5m2!1shi!2sin" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{
                border: 0
            } } 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
        </div>
    )
}

export default GoogleMapWidget