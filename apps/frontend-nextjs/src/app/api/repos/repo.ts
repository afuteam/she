// const Authorization = 'Bearer 62514af6b2989f982a07ab9956c29cd7f86007b545314ca46f7d123458110f1b93e64d828f1e590ace89582ba5e80302a5d6253b9967ded14b18c63f3a8f3d8ed0b76fd3398669a31b580ca5e8f9f244b9e77c134090742d744bd7853bdc763ceaf0391e1d7eca1c9328c668b38c27a291dd49f9bb89ae380f6470415cc5fbaf'

export async function GetRepoData() {
  const res = await fetch('http://localhost:1337/api/repos-plural', {
    headers: {
      // 'Authorization': Authorization
    }
  });
  const data = await res.json();
  return data;
}

export async function UpdateRepoData(data: { data: { name: string; description: string; name_with_namespace: string; path: string; path_with_namespace: string; default_branch: string; }[]; }) {
  const response = await fetch('http://localhost:1337/api/repos-plural', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': Authorization
    },
    body: JSON.stringify(data)
  });
  return response.json();
}
