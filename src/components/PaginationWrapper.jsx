import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';

const PaginationWrapper = ({ page, setPage, totalPages }) => {
    return (
        <Pagination className="my-6 text-neutral-600 pagination">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {
                    [...Array(totalPages || 0)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                            <PaginationItem key={pageNum}>
                                <PaginationLink
                                    isActive={page === pageNum}
                                    onClick={() => setPage(pageNum)}
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })
                }

                <PaginationItem>
                    <PaginationNext
                        onClick={() => setPage(prev => prev + 1)}
                        className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationWrapper