import { defineField, defineType } from "sanity";

export default  defineType({
  name: "product",
  type: "document",
  title: "Products",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "id",
      type: "string",
      title: "ID",
    }),
    defineField({
      name: "rating",
      type: "object",
      title: "Rating",
      fields: [
        defineField({ name: "rate", type: "number", title: "Rate" }),
        defineField({ name: "count", type: "number", title: "Count" }),
      ],
    }),
  ],
});
