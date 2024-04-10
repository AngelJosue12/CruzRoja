import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import ambulancia from './ambulancia.png';
import svg from './svg.png';
import './AnuncioServicios.css'; // Importa tu archivo CSS o SCSS

export default function AnuncioServicios() {
    return (
        <div className="main-container ">
            <div className="background-image ">
                <img src={svg} alt=""  />
            </div>
            <div className="content-container ">
                <Card className={`w-full max-w-[88rem] flex-row mx-auto my-1 colorcad`}>
                    <CardHeader
                        className="colorcad"
                    >
                        <img
                            src={ambulancia}
                            alt="card-image"
                            className="colorcad"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h6" color="gray" className="mb-4 uppercase">
                            startups
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Lyft launching cross-platform service this week
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal">
                            Like so many organizations these days, Autodesk is a company in
                            transition. It was until recently a traditional boxed software company
                            selling licenses. Yet its own business model disruption is only part
                            of the story
                        </Typography>
                        <a href="#" className="inline-block">
                            <Button variant="text" className="flex items-center gap-2">
                                Learn More
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </a>
                    </CardBody>
                </Card>
            </div>
            
        </div>
    );
}