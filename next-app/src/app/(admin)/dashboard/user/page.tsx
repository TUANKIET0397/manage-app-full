import { auth } from "@/auth";
import UserTable from "@/components/admin/user.table";
import { sendRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const ManageUserPage = async (props: IProps) => {
  const searchParams = await props.searchParams;
  const current = searchParams?.current ?? 1;
  const pageSize = searchParams?.pageSize ?? 10;
  const session = await auth();
  const accessToken = (session?.user as { access_token?: string } | undefined)
    ?.access_token;

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {},
    nextOption: {
      next: { tags: ["list-users"] },
    },
  });

  return (
    <div>
      <UserTable users={res?.data?.results ?? []} meta={res?.data?.meta} />
    </div>
  );
};

export default ManageUserPage;
