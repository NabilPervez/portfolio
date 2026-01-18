"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc?: string;
}

export const ImageWithFallback = (props: ImageWithFallbackProps) => {
    const { src, fallbackSrc, alt, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <Image
            {...rest}
            src={imgSrc}
            alt={alt}
            onError={() => {
                setImgSrc(fallbackSrc || '/logo.jpg');
            }}
        />
    );
};
