

import React from 'react'
import { TripDetailsView } from './view/TripDetailsView';

const TripDetailsPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    return <TripDetailsView id = {id} />
}

export default TripDetailsPage