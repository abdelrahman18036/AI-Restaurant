// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters."
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address."
//   }),
//   dietaryPreferences: z.array(z.string()).refine((value) => value.length > 0, {
//     message: "You must select at least one dietary preference."
//   })
// });

// export function RestaurantSignupForm() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       dietaryPreferences: []
//     }
//   });

//   async function onSubmit(values) {
//     setIsLoading(true);

//     // Simulating an API request
//     setTimeout(() => {
//       setIsLoading(false);
//       setSubmitted(true);
//       toast({
//         title: "Success!",
//         description: "Your account has been created."
//       });
//     }, 1500);
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//       {submitted ? (
//         <p className="text-green-600 text-center">
//           🎉 You have successfully signed up!
//         </p>
//       ) : (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="John Doe" {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     This is how we'll address you in our communications.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="john@example.com" {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     We'll use this to send you updates about our menu and special
//                     offers.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="dietaryPreferences"
//               render={() => (
//                 <FormItem>
//                   <div className="mb-4">
//                     <FormLabel className="text-base">
//                       Dietary Preferences
//                     </FormLabel>
//                     <FormDescription>
//                       Select all that apply. This helps us customize your menu
//                       experience.
//                     </FormDescription>
//                   </div>
//                   {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free"].map(
//                     (item) => (
//                       <FormField
//                         key={item}
//                         control={form.control}
//                         name="dietaryPreferences"
//                         render={({ field }) => {
//                           return (
//                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                               <FormControl>
//                                 <Checkbox
//                                   checked={field.value?.includes(item)}
//                                   onCheckedChange={(checked) => {
//                                     return checked
//                                       ? field.onChange([...field.value, item])
//                                       : field.onChange(
//                                           field.value?.filter(
//                                             (value) => value !== item
//                                           )
//                                         );
//                                   }}
//                                 />
//                               </FormControl>
//                               <FormLabel className="font-normal">{item}</FormLabel>
//                             </FormItem>
//                           );
//                         }}
//                       />
//                     )
//                   )}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? "Signing up..." : "Sign Up"}
//             </Button>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// }

// export default RestaurantSignupForm;
