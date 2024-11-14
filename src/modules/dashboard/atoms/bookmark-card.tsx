import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Bookmark } from "@/services/bookmarks/types";
import { Category } from "@/services/categories/types";
import { SquareArrowOutUpRight } from "lucide-react";
import { BookmarkDetailsDialog } from "./bookmark-details-dialog";

export const BookmarkCard = (props: {bookmark: Bookmark, categories: Category[]}) => {
  const {bookmark, categories} = props
  return (
    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex flex-col gap-4">
      <div className="flex flex-nowrap gap-2 overflow-hidden overflow-ellipsis">
        {bookmark.categories.map((newCat) => {
          const foundCat = categories.find((cat) => cat.id === newCat)
          return (
            <div key={newCat} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: foundCat?.color}}/>
              <span className="text-xs text-nowrap" style={{color: foundCat?.color}}>{foundCat?.name}</span>
            </div>
          )
        })}
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="overflow-hidden">{bookmark.title}</span>
        <div className="flex gap-2 items-center justify-end">
          <BookmarkDetailsDialog bookmark={bookmark} categories={categories}/>
          {bookmark.type === 'link' && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => {
                  window.open(bookmark.content, "_blank");
                }}>
                  <SquareArrowOutUpRight className="h-[0.5rem] w-[0.5rem]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{bookmark.content}</p>
              </TooltipContent>
            </Tooltip>
            )}
        </div>
      </div>
    </div>
  )
}