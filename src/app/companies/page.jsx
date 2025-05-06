"use client"
import CategoryItem from '@/components/CategoryItem';
import CategoryItemSkeleton from '@/components/CategoryItemSkeleton';
import CompanyItem from '@/components/CompanyItem';
import CompanyItemSkeleton from '@/components/CompanyItemSkeleton';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCompanies = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/company");
      const data = await res.json();

      setCompanies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteCompany = async (e, title) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await fetch(`/api/company/${title}`, {
        method: "DELETE"
      });
      const data = await res.json();

      getCompanies();

      if (res.ok) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка удаление компании");
    } finally {
      setIsLoading(false);
    }
  }



  useEffect(() => {
    getCompanies();
  }, []);
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-end mb-6 ">
          <h2 className="text-4xl font-semibold">
            Şirkətlər
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {isLoading && [...Array(8)].map((el, index) => <CompanyItemSkeleton key={index} />)}
          {
            companies?.map(company => (
              <CompanyItem key={company._id} logo={company.imageUrl} title={company.title} description={company.description} onClick={(e) => deleteCompany(e, company.title)} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Companies