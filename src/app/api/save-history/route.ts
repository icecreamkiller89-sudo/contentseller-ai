import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } =
      await supabase
        .from("histories")
        .insert([
          {
  user_id: body.user_id,
  tool_name: body.tool_name,
  input_data: body.input_data,
  output_data: body.output_data,

  generated_date:
    new Date()
      .toISOString()
      .split("T")[0],
},
        ])
        .select();

    if (error) {
      console.error(error);

      return Response.json(
        {
          success: false,
          error,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}
