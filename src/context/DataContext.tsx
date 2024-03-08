import instance from '@/lib/axiosConfig';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type TPlaceResponse = {
    points: {
      coordinates: [number, number];
      type: string;
    };
    _id: string;
    title: string;
    slug_name: string;
    description: string;
    location: string;
    wardno: string;
    category:  string;
    thumbnail: string;
    images: string[];
    totalRating: number;
    rating: {
      userId: string;
      userRating: number;
      _id: string;
    }[];
    __v: number;
  };
  export type TUserResponse = {
    _id: string,
    username: string,
    email: string,
    role: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    fullname: string,
  }

  export type TVideoResponse =  {
    _v: number,
    _id: string,
    link: string,
    title: string,
  }


interface DataContextType {
  userData: TUserResponse[];
  placesData: TPlaceResponse[];
  videosData: TVideoResponse[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

const HEADER_CONFIG = {
    'Content-Type': 'application/json',
    'x-api-key': '5bdb68c9efa67cf69f3425f908'
  }
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<TUserResponse[]>([]);
  const [placesData, setPlacesData] = useState<TPlaceResponse[]>([]);
  const [videosData, setVideosData] = useState<TVideoResponse[]>([]);

  const fetchUserData = async () => {
    try {
      const response = await instance.get('/users',{
        headers: HEADER_CONFIG
      });
      setUserData(response.data.data);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  // Fetch places data
  const fetchPlacesData = async () => {
    try {
      const response = await instance.get('/places',{
        headers: HEADER_CONFIG
      });
      setPlacesData(response.data.data);
    } catch (error) {
      console.log('Error fetching places data:', error);
    }
  };

  // Fetch videos data
  const fetchVideosData = async () => {
    console.log(" i have been caclled")
    try {
      const response = await instance.get('/videos',{
        headers: HEADER_CONFIG
      });
      setVideosData(response.data.data);
    } catch (error) {
      console.log('Error fetching videos data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPlacesData();
    fetchVideosData();
  }, []);

  return (
    <DataContext.Provider value={{ userData, placesData, videosData }}>
      {children}
    </DataContext.Provider>
  );
};
