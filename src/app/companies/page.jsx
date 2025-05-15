"use client"
import CompanyItem from '@/components/cards/CompanyItem';
import CompanyItemSkeleton from '@/components/cards/skeletons/CompanyItemSkeleton';
import { useDeleteCompanyMutation, useGetCompaniesQuery } from '@/services/vacancy';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Companies = () => {
  const {data: companies, error, isLoading, isFetching} = useGetCompaniesQuery();
  const [deleteCompany] = useDeleteCompanyMutation();

  const handleDelete = async (e, slug) => {
    try {
      e.preventDefault();

      const result = await deleteCompany(slug).unwrap();
      toast.success(result?.msg);
    } catch (error) {
      toast.error(error?.data?.msg);
    }
  }

  return (
    <section className="py-5 md:py-10">
      <div className="container">
        <div className="flex justify-between items-end mb-6 ">
          <h2 className="title">
            Şirkətlər
          </h2>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(isLoading || isFetching) && [...Array(8)].map((el, index) => <CompanyItemSkeleton key={index} />)}
          {
            companies?.map(company => (
              <CompanyItem key={company._id} logo={company.imageUrl} title={company.title} slug={company.slug} description={company.description} onClick={(e) => handleDelete(e, company.slug)} vacancyCount={company.vacancyCount} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Companies